// Infrastructure Layer

const responseUtil = require('../util/response')

const { success, serviceUnavailable } = responseUtil

const KB = 1000

const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const MESSAGE_STATUS_OK = { status: 'OK' }

// Check the status of the database.
// Check the status of an external service.
function checkReady () {
  return true
}

function uptime () {
  const secs = process.uptime()

  const hours = ('0' + Math.floor(secs / 3600)).slice(-2)
  const minutes = ('0' + Math.floor(secs % 3600 / 60)).slice(-2)
  const seconds = ('0' + Math.floor(secs % 3600 % 60)).slice(-2)

  return {
    hours,
    minutes,
    seconds
  }
}

function formatMemory (bytes) {
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(KB))
  return parseFloat((bytes / Math.pow(KB, i)).toFixed(2)) + ' ' + SIZES[i]
}

function checkReadyAndHandleError (req, res) {
  if (!checkReady()) {
    serviceUnavailable(res)
    return false
  }

  return true
}

// The application is ready to serve requests.
const ready = (req, res) => {
  if (!checkReadyAndHandleError(req, res)) {
    return
  }

  success(res)(MESSAGE_STATUS_OK)
}

// The application is up and running.
const live = (req, res) => {
  if (!checkReadyAndHandleError(req, res)) {
    return
  }

  success(res)({
    condition: MESSAGE_STATUS_OK,
    uptime: uptime()
  })
}

const memoryUsage = (req, res) => {
  const mem = process.memoryUsage()
  const formatted = {}
  for (const key in mem) {
    formatted[key] = formatMemory(mem[key])
  }

  success(res)({ formatted })
}

module.exports = {
  memoryUsage,
  live,
  ready
}
