const express = require('express')
const router = express.Router()
const knex = require('../database/client')

// select all the rows from the lunch_week table
const getLunchWeekList = () => {
  return knex.select().from('lunch_week').orderBy('week_of')
}

const getLunchWeekById = (id) => {
  return knex.select().from('lunch_week').where('lunch_week_id', id).first()
}

// Call the helper function in our endpoint. Knex database queries
router.get('/', async function (req, res) {
  const lunchWeekList = await getLunchWeekList()
  res.send(lunchWeekList)
})

router.get('/:lunchWeekId', async function (req, res) {
  const id = parseInt(req.params.lunchWeekId)
  const lunchWeek = await getLunchWeekById(id)
  if (lunchWeek) {
    res.send(lunchWeek)
  } else {
    res.status(404).send()
  }
})

module.exports = router
