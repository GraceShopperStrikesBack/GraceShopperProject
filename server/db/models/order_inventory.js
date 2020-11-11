const Sequelize = require('sequelize')
const db = require('../db')

const Order_inventory = db.define('order_inventory', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
    }
})



module.exports = Order_inventory;