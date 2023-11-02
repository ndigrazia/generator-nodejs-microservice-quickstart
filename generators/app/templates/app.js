const http = require('http')
const config = require('./config')
const express = require('./util/express')
const router = require('./api')
const { logger } = require('./util/logger')

const app = express(config.apiRoot, router)

const server = http.createServer(app)

const port = config.port
const ip = config.ip

setImmediate(() => {
  server.listen(port, ip, () => {
    logger.info('Server running at %s:%s', ip, port)
  })
})

process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

async function closeGracefully (signal) {
  logger.info('Received signal to terminate: %s', signal)

  try {
    await server.close()
    // await db.close() if we have a db connection in this app.
    // await other things we should cleanup nicely.
    logger.info('Server closed gracefully!!!')
    process.exit(0)
  } catch (error) {
    logger.error('Error during app close: %s', error)
    process.exit(1)
  }
}
