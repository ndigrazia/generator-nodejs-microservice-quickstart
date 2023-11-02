const { Router } = require('express')

const { memoryUsage, live, ready } = require('./controller')

const router = Router()

/**
 * @api {get} /memory-usage Give an information about the memory usage.
 * @apiName MemoryUsage
 * @apiGroup Metrics
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Object} formatted Memory usage.
 */
router.get('/memory-usage', memoryUsage)

/**
 * @api {get} /live Give an information about the application is up and running.
 * @apiName Liveness
 * @apiGroup Health
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Object} Status of the application.
 * @apiError 503 Service Unavailable.
 */
router.get('/live', live)

/**
 * @api {get} /ready Give an information about the application is ready to serve requests.
 * @apiName Readiness
 * @apiGroup Health
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Object} Status of the application.
 * @apiError 503 Service Unavailable.
 */
router.get('/ready', ready)

module.exports = router
