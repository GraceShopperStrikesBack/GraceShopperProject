const router = require('express').Router()
const Inventory = require('../db/models/inventory')
const Order = require('../db/models/order')
const OrderInventory = require('../db/models/order_inventory')

// router.get('/', async (req, res, next) => {
//is this the order or cart
// })

router.post('/', async (req, res, next) => {
  try {
    console.log('in router post >>>>>>>>>>>>>>>>>>>>>>>>>')
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
      console.log('in if statement and just adding quantity')
      orderInventory.quantity = orderInventory.quantity + 1
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
      console.log('in end of else statement')
      res.status(200).json(createdOI)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

//Comes in
//Add to Cart (creates new Order with the inventory in it, or add inventory to existing Order)
//
