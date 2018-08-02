const { expect } = require('chai');
const db = require('../index');
const Review = db.model('review');

describe('Review model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    it('Review model has the expected schema definition', () => {
        expect(Review.attributes.body).to.be.an('object')
        expect(Review.attributes.rating).to.be.an('object')
        expect(Review.attributes.snippet).to.be.an('object')
    });

    describe('Validations', () => {
        it('requires a body', () => {
            const review = Review.build();
            return review.validate()
                .then(() => { throw new Error('Promise should have rejected, namsaying bb'); })
                .catch(err => {
                    expect(err).to.exist;
                    expect(err).to.be.an('error');
                });
        });

    });
});

//must have a proper default value if there is no description
it('requires a rating', () => {
    const review = Review.build()
    return review.validate()
        .then(() => { throw new Error('Promise should have rejected, namsaying bb'); })
        .catch(err => {
            expect(err).to.exist;
            expect(err).to.be.an('error');
        });
});
