import z from 'zod'

const eventSchema = z.object({
  PORT: z.coerce.number().default(3333),
  WEB_URL: z.string().url(),
  API_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  NODE_ENV: z.string().default('development'),
})

export const env = eventSchema.parse(process.env)
