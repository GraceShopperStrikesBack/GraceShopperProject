const router = require('express').Router()
const Inventory = require('../db/models/inventory')
const Order = require('../db/models/order')
const OrderInventory = require('../db/models/order_inventory')

// router.get('/', async (req, res, next) => {
//is this the order or cart
// })

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
      orderInventory.quantity += 1
    } else {
      // let inventoryPrice = await Inventory.findOne({
      //     where: {
      //         id: req.body.inventoryId
      //     }
      // })
      // console.log('INVENTORY PRICE >>>>>>>>>>>>>>>>>>>>>', inventoryPrice.price)

      await OrderInventory.create({
        inventoryId: req.body.inventoryId,
        orderId: userOrder[0].dataValues.id,
        quantity: 1
        // price: inventoryPrice[0].dataValues.price
      })
    }
    res.status(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

//Comes in
//Add to Cart (creates new Order with the inventory in it, or add inventory to existing Order)
//
