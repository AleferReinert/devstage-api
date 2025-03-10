import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/accessInviteLink'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/invites/:subscriberId',
    {
      schema: {
        operationId: 'accessInviteLink',
        summary: 'Incrementa um acesso ao contador de acessos do convite e redireciona para o site',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      const redirectUrl = new URL(env.WEB_URL)

      await accessInviteLink({ subscriberId })
      console.log('referral:access-count: ', await redis.hgetall('referral:access-count'))
      redirectUrl.searchParams.set('referrer', subscriberId)
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
