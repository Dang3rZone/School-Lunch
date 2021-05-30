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

const updateLunchWeek = (id, lunchWeek) => {
  return knex('lunch_week').where('lunch_week_id', id).update(lunchWeek)
}

const deleteLunchWeek = (lunchWeekId) => {
  return knex('lunch_week').where('lunch_week_id', lunchWeekId).del()
}

const createLunchWeek = (lunchWeek) => {
  // for Postgres, we need to specifiy what columns to return back
  // from the insert statement with a call to `.returning()`
  return knex('lunch_week').insert(lunchWeek).returning('lunch_week_id')
}

// Call the helper function in our endpoint. Knex database queries
router.get('/', async function (req, res) {
  try {
    const lunchWeekList = await getLunchWeekList()
    res.send(lunchWeekList)
  } catch (e) {
    res
      .status(500)
      .send({ message: `Error getting Lunch Week List`, error: e.toString() })
  }
})

router.get('/:lunchWeekId', async function (req, res) {
  try {
    const id = parseInt(req.params.lunchWeekId)
    const lunchWeek = await getLunchWeekById(id)
    if (lunchWeek) {
      res.send(lunchWeek)
    } else {
      const message = `Lunch Week Id ${req.params.lunchWeekId} not found`
      res.status(404).send({
        message: message,
      })
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: `Error getting Lunch Week List`, error: err.toString() })
  }
})

router.post('/', async function (req, res) {
  const lunchWeek = req.body
  try {
    const insertResponse = await createLunchWeek(lunchWeek)

    const insertedLunchWeekId = insertResponse[0]
    const response = {
      lunchWeekId: insertedLunchWeekId,
    }
    res.send(response)
  } catch (e) {
    const message = `Error creating Lunch Week`
    res.status(500).send({ message: message, error: e.toString() })
  }
})

router.put('/:lunchWeekId', async function (req, res) {
  try {
    const id = parseInt(req.params.lunchWeekId)
    const lunchWeek = req.body

    if (id !== lunchWeek.lunchWeekId) {
      const message = `Bad request, IDs do not match`
      res.status(400).send({ message: message })
      // IMPORTANT, we need to explicitly return here, otherwise the rest
      // of the endpoint code will continue to run.
      // In other words, res.send does not return like you might think it would
      return
    }

    await updateLunchWeek(id, lunchWeek)
    res.send()
  } catch (e) {
    const message = `Error updating Lunch Week`
    res.status(500).send({ message: message, error: e.toString() })
  }
})

router.delete('/:lunchWeekId', async function (req, res) {
  try {
    const id = parseInt(req.params.lunchWeekId)
    await deleteLunchWeek(id)
    res.send()
  } catch (e) {
    const message = `Error deleting Lunch Week`
    res.status(500).send({ message: message, error: e.toString() })
  }
})

module.exports = router
