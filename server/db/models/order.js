const Sequelize = require('sequelize');
const db = require('../db.js');

const Order = db.define('order', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sessionId: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    billingAddress: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    shippingAddress: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
})

module.exports = Order;