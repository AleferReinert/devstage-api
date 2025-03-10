import Redis from 'ioredis'
import { env } from '../env'

export const redis = new Redis(env.REDIS_URL)

// Logando comandos enviados para o Redis
redis.on('command', command => {
  console.log('Redis Command:', command)
})

// Logando erros
redis.on('error', err => {
  console.error('Redis Error:', err)
})

// Logando conexão bem-sucedida
redis.on('connect', () => {
  console.log('Connected to Redis!')
})

// Logando reconexões
redis.on('reconnecting', (delay: number) => {
  console.log(`Reconnecting to Redis in ${delay}ms`)
})
