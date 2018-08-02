/* global describe beforeEach it */
const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('spaceship')

describe('Products routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/products/', () => {
        const products = 'Shanker Banker'

        beforeEach(() => {
            return Products.create({
                title: 'Shanker Banker',
                description: 'Oh babi oh babi, this shanker banker is bananas',
                price: 24,
                inventory: 13,
                vesselType: 'Romance',
                capacity: 6000,
                image: 'https://cnet2.cbsistatic.com/img/D7XkQ0ANlHjKIKvNl1E1WAVdkdc=/670x503/2013/06/22/33d07641-f07b-11e2-8c7c-d4ae52e62bcc/9022790344_a1f40907be.jpg'
            })
        })

        it('GET /api/products', () => {
            return request(app)
                .get('/api/products')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].title).to.be.equal('Shanker Banker')
                    // 'https://cnet2.cbsistatic.com/img/D7XkQ0ANlHjKIKvNl1E1WAVdkdc=/670x503/2013/06/22/33d07641-f07b-11e2-8c7c-d4ae52e62bcc/9022790344_a1f40907be.jpg'
                    expect(res.body[0].price).to.be.equal('24')
                    expect(res.body[0].inventory).to.be.equal(13)
                    expect(res.body[0].vesselType).to.be.equal('Romance')
                    expect(res.body[0].capacity).to.be.equal(6000)
                    expect(res.body[0].image).to.be.equal('https://cnet2.cbsistatic.com/img/D7XkQ0ANlHjKIKvNl1E1WAVdkdc=/670x503/2013/06/22/33d07641-f07b-11e2-8c7c-d4ae52e62bcc/9022790344_a1f40907be.jpg')
                })
        })
    })
}) 