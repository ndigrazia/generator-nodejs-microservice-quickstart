const HTTP_STATUS_CODES = {
  OK: 200,
  Created: 201,
  No_Content: 204,
  Not_Found: 404,
  Bad_Request: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Conflict: 409,
  Internal_Server_Error: 500,
  Service_Unavailable: 503
}

const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || HTTP_STATUS_CODES.OK).json(entity)
  }

  return null
}

const serviceUnavailable = (res) => () => {
  res.status(HTTP_STATUS_CODES.Service_Unavailable).end()
}

const created = (res) => (entity) => {
  return success(res, HTTP_STATUS_CODES.Created)(entity)
}

const notFound = (res) => () => {
  res.status(HTTP_STATUS_CODES.Not_Found).end()
}

const noContent = (res) => () => {
  res.status(HTTP_STATUS_CODES.No_Content).end()
}

module.exports = {
  success,
  notFound,
  created,
  noContent,
  serviceUnavailable
}
