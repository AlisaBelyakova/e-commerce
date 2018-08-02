const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Order model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    it('Order model has the expected schema definition', () => {
        expect(Order.attributes.status).to.be.an('object')
    });

});
