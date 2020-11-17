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

//admin editing routes//

router.post('/', async (req, res, next) => {
  try {
    const name = await Inventory.findOne({
      where: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
      }
    })
    if (name !== null) {
      res.send('Item already exists!')
    } else {
      res.send(
        await Inventory.create({
          name: req.body.name,
          imageUrl: req.body.imageUrl,
          description: req.body.description,
          price: req.body.price
        })
      )
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:inventoryId', async (req, res, next) => {
  try {
    const itemId = req.params.inventoryId
    if ((await Inventory.findByPk(itemId)) === null) {
      res.send('Item not found.')
    } else {
      const item = await Inventory.findByPk(itemId)
      res.send(await item.destroy())
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:inventoryId', async (req, res, next) => {
  try {
    const itemId = req.params.inventoryId
    if ((await Inventory.findByPk(itemId)) === null) {
      res.send('Item not found.')
    } else {
      const item = await Inventory.findByPk(itemId)
      if (req.body.name) {
        item.name = req.body.name
      }
      if (req.body.imageUrl) {
        item.imageUrl = req.body.imageUrl
      }
      if (req.body.description) {
        item.description = req.body.description
      }
      if (req.body.price) {
        item.price = req.body.price
      }
      res.send(await item.save())
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
