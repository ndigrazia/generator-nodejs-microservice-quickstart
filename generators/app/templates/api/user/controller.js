// Infrastructure Layer

const responseUtil = require('../util/response')
const userService = require('../../service/user/service')

const { success, notFound, created, noContent } = responseUtil
const { createUser, updateUser, deleteUser, getAllUsers, getOrdersByUserId } = userService

const find = ({ querymen }, res, next) => {
  const list = getAllUsers(querymen)
  success(res)(list)
}

const create = (req, res, next) => {
  const e = createUser(req.bodymen.body)
  created(res)(e)
}

const update = (req, res, next) => {
  const e = updateUser(req.params.id, req.bodymen.body)

  if (!e) { notFound(res)() }

  success(res)(e)
}

const remove = (req, res) => {
  const e = deleteUser(req.params.id)

  if (!e) { notFound(res)() }

  noContent(res)()
}

const ordersByUserId = (req, res, next) => {
  try {
    success(res)(getOrdersByUserId(req.params.id))
  } catch (error) {
    notFound(res)()
  }
}

module.exports = {
  create,
  update,
  remove,
  find,
  ordersByUserId
}
