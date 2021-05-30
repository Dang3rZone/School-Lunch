const knex = require('knex')

// determine the environment from the ENV || default to development
const environment = process.env.ENVIRONMENT || 'development'

// get the appropriate config for the given environment
const config = require('../knexfile.js')[environment]
const knexStringcase = require('knex-stringcase')
const options = knexStringcase(config)
// instantiate Knex with the config
const db = knex(options)

module.exports = db
