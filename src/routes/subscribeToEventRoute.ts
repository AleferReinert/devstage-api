import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribeToEvent'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Registra um usuário no evento',
        tags: ['Subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      // Create a subscription in the database
      const { subscriberId } = await subscribeToEvent({ name, email })
      return reply.status(201).send({ subscriberId })
    }
  )
}
