// Application Layer

const { logger, logDebug } = require('../../util/logger')
const { save, findAll, remove, update, findAllByFilter } = require('./repository')
const { fetchOrdersByUserId } = require('../../service-backing/order/service')

// Logic to create a new user in the database.
const createUser = (user) => {
  logDebug(logger, 'Trying to create user %s', user)
  return save(user)
}

// Logic to retrieve all users from the database.
const getAllUsers = (filters) => {
  if (filters && filters.query) {
    if (filters.query.firstName) {
      return findAllByFilter({ firstName: filters.query.firstName })
    }

    if (filters.query.id) {
      return findAllByFilter({ id: filters.query.id })
    }
  }

  return findAll()
}

// Logic to update an user in the database by their ID with new data.
const updateUser = (userId, newData) => {
  logDebug(logger, 'Trying to update user %s', userId)
  return update(userId, newData)
}

// Logic to delete an user in the database by their ID.
const deleteUser = (userId) => {
  logDebug(logger, 'Trying to delete user %s', userId)
  return remove(userId)
}
function singleResult (list) {
  if (list && list.length === 1) {
    return list[0]
  }
  throw new Error('No single result was expected!!!!!!!')
}

const getOrdersByUserId = (userId) => {
  logDebug(logger, 'Returning orders by user: %s', userId)

  const user = singleResult(getAllUsers({ query: { id: userId } }))

  const ordersByUserId = fetchOrdersByUserId(userId)

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    orders: ordersByUserId
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOrdersByUserId
}
