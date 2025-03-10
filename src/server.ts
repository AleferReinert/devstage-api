import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/accessInviteLinkRoute'
import { getRankingRoute } from './routes/getRankingRoute'
import { getSubscriberInviteClicksRoute } from './routes/getSubscriberInviteClicksRoute'
import { getSubscriberInvitesCountRoute } from './routes/getSubscriberInvitesCountRoute'
import { getSubscriberRankingPositionRoute } from './routes/getSubscriberRankingPositionRoute'
import { subscribeToEventRoute } from './routes/subscribeToEventRoute'

const fastify = Fastify().withTypeProvider<ZodTypeProvider>()

fastify.setSerializerCompiler(serializerCompiler)
fastify.setValidatorCompiler(validatorCompiler)

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DevStage API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

fastify.register(subscribeToEventRoute)
fastify.register(accessInviteLinkRoute)
fastify.register(getSubscriberInviteClicksRoute)
fastify.register(getSubscriberInvitesCountRoute)
fastify.register(getSubscriberRankingPositionRoute)
fastify.register(getRankingRoute)

fastify.register(cors, {
  origin: [`http://localhost:${env.PORT}`, env.WEB_URL],
})

fastify.listen({ port: env.PORT }).then(() => {
  console.log(`\x1b[1mDocs:\x1b[0m \x1b[34m${env.WEB_URL}/docs\x1b[0m`)
  console.log('\x1b[32m✓ HTTP Server running!\x1b[0m')
})
