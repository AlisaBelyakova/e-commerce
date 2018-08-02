const Sequelize = require('sequelize');
const db = require('../db.js');

const LineItems = db.define('lineItems', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

module.exports = LineItems;