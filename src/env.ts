import z from 'zod'

const eventSchema = z.object({
	PORT: z.coerce.number().default(3333),
	API_URL_PROD: z.string().url()
})

export const env = eventSchema.parse(process.env)
