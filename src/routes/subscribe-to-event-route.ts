import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Inscrever-se no evento',
        tags: ['Subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      // Create a subscription in the database
      return reply.status(201).send({ name, email })
    }
  )
}
