const User = require('./user')
// const Cart = require('./cart')
const Inventory = require('./inventory')
const Review = require('./review')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Cart.belongsTo(User)
// User.hasOne(Cart)

//No need for cart - User Inventory magic method will create Cart and we can pull
//individual user's cart by using userId which is unique.

// Inventory.belongsToMany(Cart, { through: 'Cart_Inventory' })
// Cart.belongsToMany(Inventory, {through: 'Cart_Inventory'})

User.hasMany(Order)
Inventory.belongsToMany(Order, {through: 'Cart'})
Order.belongsTo(User)
Order.hasMany(Inventory)

Review.belongsTo(Inventory)
Inventory.hasMany(Review)

module.exports = {
  User,
  // Cart,
  Inventory,
  Review,
  Order
}
