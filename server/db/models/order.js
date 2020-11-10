const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    // rating: {
    //     type: Sequelize.FLOAT,
    //     allowNull: false,
    //     defaultValue: 3
    // }
})

module.exports = Order;

