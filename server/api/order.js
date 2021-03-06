const router = require('express').Router()
const Inventory = require('../db/models/inventory')
const Order = require('../db/models/order')
const OrderInventory = require('../db/models/order_inventory')

router.get('/all', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {model: Inventory}
    })
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {userId: req.body.userId, isFulfilled: false},
      include: {model: Inventory}
    })
    if (!order) {
      // order = await Order.create({
      //   where: {userId: req.body.userId, isFulfilled: false},
      //   include: {model: Inventory}
      // })
      res.status(404)
    } else {
      res.status(200).json(order)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.orderId, {
      include: {model: Inventory}
    })
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let userOrder = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        isFulfilled: false
      }
    })

    let orderInventory = await OrderInventory.findOne({
      where: {
        inventoryId: req.body.inventoryId,
        orderId: userOrder[0].dataValues.id
      }
    })

    if (orderInventory) {
      orderInventory.quantity = orderInventory.quantity + 1
      await orderInventory.save()
      res.status(200).json(orderInventory)
    } else {
      let inventoryPrice = await Inventory.findOne({
        where: {
          id: req.body.inventoryId
        }
      })

      let createdOI = await OrderInventory.create({
        inventoryId: req.body.inventoryId,
        orderId: userOrder[0].dataValues.id,
        quantity: 1,
        price: inventoryPrice.price
      })
      res.status(200).json(createdOI)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    let orderToUpdate = await OrderInventory.findOne({
      where: {orderId: orderId, inventoryId: req.body.id}
    })
    if (orderToUpdate) {
      orderToUpdate.quantity += 1
      await orderToUpdate.save()
    } else {
      orderToUpdate = await OrderInventory.create({
        quantity: 1,
        price: req.body.price,
        orderId: req.params.orderId,
        inventoryId: req.body.id
      })
    }
    res.status(200).json(orderToUpdate)
  } catch (err) {
    next(err)
  }
})

module.exports = router

//Comes in
//Add to Cart (creates new Order with the inventory in it, or add inventory to existing Order)
//
