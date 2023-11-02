// Infrastructure Layer

const { v4: uuidv4 } = require('uuid')
const { logger, logDebug } = require('../../util/logger')

let list = []

// Logic to create a new user in the database.
const save = (user) => {
  const e = {
    id: uuidv4(),
    ...user
  }

  list.push(e)

  logger.info('A new user created: %s', e)

  return e
}

// Logic to retrieve all users from the database.
const findAll = () => {
  logger.info('All users returned!')
  return list
}

// Logic to retrieve all user from the database.
const findAllByFilter = (filters) => {
  if (filters) {
    logDebug(logger, 'Finding users by', filters)

    const properties = Object.keys(filters)

    return list.filter(item => {
      for (let i = 0; i < properties.length; i++) {
        if (!item[properties[i]].includes(filters[properties[i]])) {
          return false
        }
      }

      return true
    })
  }

  return []
}

// Logic to update an user in the database by their ID with new data.
const update = (userId, newData) => {
  const e = list.find(item => item.id === userId)

  if (!e) {
    logDebug(logger, 'User %s not found', userId)
    return undefined
  }

  e.email = (newData.email) ? newData.email : e.email
  e.address = (newData.address) ? newData.address : e.address
  e.role = (newData.role) ? newData.role : e.role
  e.delivery = (newData.delivery) ? newData.delivery : e.delivery

  logger.info('User updated: %s', e)

  return e
}

const remove = (userId) => {
  // Logic to delete an user from the database by their ID.
  const e = list.find(item => item.id === userId)

  if (!e) {
    logDebug(logger, 'User %s not found', userId)
    return undefined
  }

  list = list.filter(item => item.id !== userId)

  logger.info('User deleted: %s', e)

  return e
}

module.exports = {
  save,
  findAll,
  remove,
  update,
  findAllByFilter
}
