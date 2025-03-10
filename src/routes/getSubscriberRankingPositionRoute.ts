import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberRankingPosition } from '../functions/getSubscriberRankingPosition'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        operationId: 'getSubscriberRankingPosition',
        summary: 'Retorna a posição do usuário no ranking',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      const { position } = await getSubscriberRankingPosition({ subscriberId })

      return { position }
    }
  )
}
