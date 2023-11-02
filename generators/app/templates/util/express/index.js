const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('../../config')
const bodyErrorHandler = require('bodymen').errorHandler
const queryErrorHandler = require('querymen').errorHandler
const { stream, logger } = require('../logger')

const requestLogger = (env) => {
  return env === 'production'
    ? morgan('common', { stream })
    : morgan('dev', { stream })
}

module.exports = (apiRoot, routes) => {
  const app = express()

  const env = config.env

  if (env === 'production' || env === 'development') {
    // TODO common activities.
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(requestLogger(env))

  app.use(apiRoot, routes)

  app.use(bodyErrorHandler())
  app.use(queryErrorHandler())

  // Default error handling middleware.
  app.use((err, req, res, next) => {
    logger.error('Error found: %s', err)
    res.status(500).json({ error: 'Internal server error' })
  })

  return app
}
