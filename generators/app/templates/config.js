const path = require('path')
const dotenv = require('dotenv')

const result = dotenv.config()

if (result.error) {
  throw result.error
}

function getApiRoot () {
  return process.env.API_ROOT || '/'
}

module.exports = {
  env: process.env.NODE_ENV || 'development',
  root: path.join(__dirname, '..'),
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || <%= port %>,
  apiRoot: getApiRoot(),
  loggerLevel: process.env.LOGGER_LEVEL || 'debug',
  apiRootTestEnv: getApiRoot() === '/' ? '' : getApiRoot()
}
