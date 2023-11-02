const { Router } = require('express')
const { info } = require('./controller')

const router = Router()

/**
 * @api {get} /about Give an information about the project.
 * @apiName About
 * @apiGroup About
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Name of the project.
 * @apiSuccess {String} description Description of the project.
 * @apiSuccess {String} author Author of the project.
 *
 */
router.get('/', info)

module.exports = router
