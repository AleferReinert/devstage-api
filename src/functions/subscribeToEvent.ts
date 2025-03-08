import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({ name, email }: SubscribeToEventParams) {
  const result = await db.insert(subscriptions).values({ name, email }).returning()
  const subscriber = result[0]
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email))

  // If the subscriber already exists, return the id
  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  return {
    subscriberId: subscriber.id,
  }
}
