const router = require('express').Router()
const Inventory = require('../db/models/inventory')
const Order = require('../db/models/order')
const OrderInventory = require('../db/models/order_inventory')

router.get('/:orderId', async (req, res, next) => {
  try {
    // console.log('in here, and req.params.orderID is', req.params.orderId)
    let order = await Order.findByPk(req.params.orderId)
    let orderInventory = await OrderInventory.findAll({
      where: {orderId: req.params.orderId}
    })
    // console.log('got orderInventory which si this', orderInventory)
    order.orderInventory = orderInventory
    // console.log('>>>>>>>>>THIS IS LINE 12!!!!!!!>>>>>>>', order)
    console.log('order.orderInventory is: ', order.orderInventory[0].dataValues)
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
    const updateOrder = await OrderInventory.update(req.body, {
      where: {orderId: orderId, inventoryId: req.body.inventoryId}
    })
    res.send(updateOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router

//Comes in
//Add to Cart (creates new Order with the inventory in it, or add inventory to existing Order)
//
