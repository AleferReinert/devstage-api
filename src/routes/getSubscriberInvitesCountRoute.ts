import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInvitesCount } from '../functions/getSubscriberInvitesCount'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/subscribers/:subscriberId/ranking/count',
    {
      schema: {
        operationId: 'getSubscriberInvitesCount',
        summary: 'Retorna a quantidade de usuários registrados através do convite personalizado',
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
      const { count } = await getSubscriberInvitesCount({ subscriberId })

      return { count }
    }
  )
}
