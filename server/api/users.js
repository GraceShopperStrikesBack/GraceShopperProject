const router = require('express').Router()
const {User, Order, Inventory, OrderInventory} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    let cart = await Order.findAll({
      where: {userId: req.params.userId, isFulfilled: false},
      include: {
        model: Inventory
      }
    })
    const user = await User.findOne({where: {id: req.params.userId}})
    if (!user) {
      await User.create({id: req.params.userId, email: 'guestuser@dummy.com'})
    }
    if (!cart.length) {
      cart = await Order.create({userId: req.params.userId})
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart/', async (req, res, next) => {
  try {
    let cart = await OrderInventory.findOne({
      where: {orderId: req.body.orderId, inventoryId: req.body.itemId}
    })
    await cart.destroy()
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/order', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {userId: req.params.userId, isFulfilled: false},
      include: {
        model: Inventory
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      include: {
        model: Order
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.body.orderId)

    order.isFulfilled = true
    order.save()
    console.log('ORDER AFTER CHANGING FULFILLED', order)
    res.status(200).send(order)
  } catch (error) {
    next(err)
  }
})
module.exports = router
