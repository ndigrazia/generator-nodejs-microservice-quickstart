const { Router } = require('express')
const body = require('bodymen').middleware
const query = require('querymen').middleware

const controller = require('./controller')
const userModel = require('../../service/user/model')

const { create, update, remove, find, ordersByUserId } = controller
const { userSchema, types } = userModel

const router = Router()

/**
 * @apiDefine body
 * @apiBody {String} firstName User's name.
 * @apiBody {String} lastName User's lastname.
 * @apiBody {String} email User's email.
 * @apiBody {String} address User's address.
 * @apiBody {String} role="Employee" User's role.
*/

/**
 * @apiDefine listParams
 * @apiParam {String} firstName Query by first name.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
*/

/**
 * @api {post} /users Create an user
 * @apiName CreateUser
 * @apiGroup User
 * @apiUse body
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.post('/', body(userSchema), create)

/**
 * @api {get} /users Retrieve all users
 * @apiName RetrieveAllUser
 * @apiGroup User
 * @apiUse listParams
 * @apiSuccess {Object[]} list List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.get('/', query({ firstName: types.firstName }), find)

/**
 * @api {put} /users/:id Update an user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam id User's id.
 * @apiUse body
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
*/
router.put('/:id', body({ email: types.email, address: types.address, delivery: types.address, role: types.role }), update)

/**
 * @api {delete} /users/:id Delete an user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiParam id User's id.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete('/:id', remove)

/**
 * @api {get} /users/:id/orders Retrieve orders by user
 * @apiName RetrieveOrdersByUser
 * @apiGroup User
 * @apiParam id User's id.
 * @apiSuccess {Object} user User's data with orders.
 * @apiError 404 User not found.
*/
router.get('/:id/orders', ordersByUserId)

module.exports = router
