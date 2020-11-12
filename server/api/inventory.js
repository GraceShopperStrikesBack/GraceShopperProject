const router = require('express').Router()
const Inventory = require('../db/models/inventory')

router.get('/', async (req, res, next) => {
  try {
    const allInventory = await Inventory.findAll()
    res.status(200).json(allInventory)
  } catch (err) {
    next(err)
  }
})

router.get('/:inventoryId', async (req, res, next) => {
  try {
    const inventoryById = await Inventory.findByPk(req.params.inventoryId)

    res.status(200).json(inventoryById)
  } catch (error) {
    next(error)
  }
})

module.exports = router
