const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "No description available."
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
    }
})

module.exports = Inventory;

