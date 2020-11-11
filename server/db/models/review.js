const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "No comments."
    }
})

module.exports = Review;

