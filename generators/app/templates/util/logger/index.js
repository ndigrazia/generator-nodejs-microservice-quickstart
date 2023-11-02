const winston = require('winston')
const config = require('../../config')
const properties = require('../../package.json')

const logger = winston.createLogger({
  level: config.loggerLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: properties.name },
  transports: [
    new winston.transports.Console()
  ]
})

// using the logger and its configured transports, to save the logs created by Morgan.
const stream = {
  write: (text) => {
    logger.info(text)
  }
}

const logDebug = (logger, message, ...meta) => {
  if (logger.isDebugEnabled()) { logger.debug(message, meta) }
}

module.exports = {
  logger,
  stream,
  logDebug
}
