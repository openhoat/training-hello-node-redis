const express = require('express')
const util = require('util')
const Redis = require('ioredis')

const { PORT = 3000, REDIS_PORT = 6379, REDIS_HOST = 'localhost' } = process.env

const start = async () => {
  const redis = new Redis(REDIS_PORT, REDIS_HOST)
  const app = express()
  app.get('/', async (req, res) => {
    const counterValue = await redis.get('counter')
    const counter = !counterValue || Number.isNaN(counterValue) ? 0 : parseInt(counterValue)
    res.json({ counter })
  })
  app.post('/', async (req, res) => {
    const counter = await redis.incr('counter')
    res.json({ counter })
  })
  const listen = util.promisify(app.listen.bind(app))
  await listen(PORT)
}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Exit.')
  process.exit(0)
})

start()
  .then(() => {
    console.log('server ready.')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
