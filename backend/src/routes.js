const { registrationUser } = require('./controllers/user')

const routes = require('express')()

routes.post('/registration', registrationUser)

module.exports = { routes }