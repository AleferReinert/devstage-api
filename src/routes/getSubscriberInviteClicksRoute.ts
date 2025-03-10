import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/getSubscriberInviteClicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/subscribers/:subscriberId/ranking/clicks',
    {
      schema: {
        operationId: 'getSubscriberInviteClicks',
        summary: 'Retorna a quantidade de vezes que o convite foi acessado',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      const { count } = await getSubscriberInviteClicks({ subscriberId })

      return { count }
    }
  )
}
