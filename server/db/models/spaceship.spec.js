const { expect } = require('chai');
const db = require('../index');
const Spaceship = db.model('spaceship');

describe('Spaceship model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    it('has the expected schema definition', () => {
        expect(Spaceship.attributes.title).to.be.an('object')
        expect(Spaceship.attributes.price).to.be.an('object')
        expect(Spaceship.attributes.description).to.be.an('object')
        expect(Spaceship.attributes.inventory).to.be.an('object')
        expect(Spaceship.attributes.vesselType).to.be.an('object')
        expect(Spaceship.attributes.capacity).to.be.an('object')
        expect(Spaceship.attributes.image).to.be.an('object')
    });

    describe('Validations', () => {
        //image has to be an URL
        it('has a default value of http://i66.tinypic.com/2iut2l0.jpg', () => {
            const spaceship = Spaceship.build()
            expect(spaceship.image).to.be.equal('http://i66.tinypic.com/2iut2l0.jpg')
        });

        //must have a proper default value if there is no description
        it('requires a description default value of Description coming soon.', () => {
            const spaceship = Spaceship.build()
            expect(spaceship.description).to.be.equal('Description coming soon.')
        });
    })
})
