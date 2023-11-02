const { Router } = require('express')

const router = new Router()

router.use('/about', require('./about'))
router.use('/health', require('./health'))
router.use('/users', require('./user'))

module.exports = router
