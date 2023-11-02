// Application Layer

const { logger, logDebug } = require('../../util/logger')

const { getOrdersByUserId } = require('./repository')

// Logic to retrieve orders from the database by userId.
const fetchOrdersByUserId = (userId) => {
  logDebug(logger, 'Trying to retrieve orders by user: %s', userId)
  return getOrdersByUserId(userId)
}

module.exports = {
  fetchOrdersByUserId
}
