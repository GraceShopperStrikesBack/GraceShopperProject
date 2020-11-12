const router = require('express').Router()
const {Inventory} = require('../db/models/inventory')

router.get('/:inventoryId', async (req, res, next) => {
  try {
    const inventoryById = await Inventory.findAll({
      where: {
        id: req.params.inventoryId
      }
    })
    res.status(200).json(inventoryById)
  } catch (error) {
    next(error)
  }
})

//require api route to inventory on index.js
