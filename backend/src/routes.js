const { registrationUser } = require('./controllers/user')
const { validateRegistration } = require('./middlewares/validateRegistration')

const routes = require('express')()

routes.post('/registration', validateRegistration, registrationUser)

module.exports = { routes }