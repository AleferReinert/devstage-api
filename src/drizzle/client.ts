import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import { subscriptions } from './schema/subscriptions'

export const pg = postgres(env.POSTGRES_URL, { debug: true, onnotice: console.log })
export const db = drizzle(pg, {
  schema: { subscriptions },
  logger: {
    logQuery: (query, params) => {
      console.log('Executing query:', query)
      console.log('With params:', params)
    },
  },
})
