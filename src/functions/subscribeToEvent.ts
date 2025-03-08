import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({ name, email, referrerId }: SubscribeToEventParams) {
  // If the subscriber already exists, return the id
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email))
  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  // If the subscriber doesn't exist, create a new one
  const result = await db.insert(subscriptions).values({ name, email }).returning()
  const subscriber = result[0]

  // Increment the access count for the referrer
  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  return {
    subscriberId: subscriber.id,
  }
}
