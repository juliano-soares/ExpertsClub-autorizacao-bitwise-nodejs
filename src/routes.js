const Router = require('koa-router')

const  {authorization: authorizationConfig} = require('../config')
// middlewares
const error = require('./middlewares/error')
const authenticated = require('./middlewares/auth')
const authorized = require('./middlewares/authorization')

const {permission} = authorizationConfig

// handlers
const users = require('./handlers/users')
const auth = require('./handlers/auth')

const router = new Router()

router.use(error)

router.get('/users', authenticated, authorized(permission.manageUsers), users.getAllUsers)
router.post('/users', authenticated, users.createUser)

router.get('/exams', authenticated, authorized(permission.getExams), async (cyx, next) => {
    ctx.body = { Glicemia: 90 },
    await next()
})

router.get('/personalInfo', authenticated, authorized(permission.getPersonalInfo), async (cyx, next) => {
    ctx.body = { Nome: 'Juliano' },
    await next()
})

router.get('/medicines', authenticated, authorized(permission.getMedicine), async (cyx, next) => {
    ctx.body = { Dipirona: true },
    await next()
})

router.post('/auth', auth.authenticate)

module.exports = router
