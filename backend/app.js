require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const lunchWeekRouter = require('./routes/lunch-week')
const passKnex = require('./database/dynamic-knex')
const authenticateJwt = require('./authenticate-jwt')

const cors = require('cors')
const app = express()
app.use(cors())
app.options('*', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const router = express.Router()

router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/lunch-week', [authenticateJwt, passKnex], lunchWeekRouter)

app.use('/api', router)

module.exports = app
