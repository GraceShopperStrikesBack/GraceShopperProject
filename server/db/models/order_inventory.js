const Sequelize = require('sequelize')
const db = require('../db')

const OrderInventory = db.define('order_inventory', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderInventory
