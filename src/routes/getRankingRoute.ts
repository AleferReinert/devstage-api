import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/getRanking'

export const getRankingRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/ranking',
    {
      schema: {
        summary: 'Retorna o top 3 do ranking',
        tags: ['Referral'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking()

      return { ranking: rankingWithScore }
    }
  )
}
