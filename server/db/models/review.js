const Sequelize = require('sequelize');
const db = require('../db.js');

const Review = db.define('review', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [1, 2018],
                msg: 'Listen, 1 or 200'
            }
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    snippet: {
        type: Sequelize.VIRTUAL,
        get() {
            if (!this.getDataValue('body')) {
                return '';
            } else {
                return this.getDataValue('body').slice(0, 100) + '...';
            }
        }
    }
})

module.exports = Review;


