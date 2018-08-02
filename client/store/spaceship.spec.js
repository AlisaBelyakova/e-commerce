import { expect } from 'chai';
import { fetchSingleSpaceship } from './spaceship';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';


const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = { spaceship: {} }

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore(initialState);
    })

    afterEach(() => {
        mockAxios.restore();
        store.clearActions();
    })


    describe('fetchSingleSpaceship', () => {
        it('fetches a specific spaceship/product', () => {
            const response = [
                {
                    title: 'Bombatronster',
                    spaceshipId: '1',
                    description: 'Humble killer with a heart of gold',
                    price: 23,
                    inventory: 10,
                    vesselType: 'Romance',
                    capacity: 2334,
                    image: 'http://i66.tinypic.com/2iut2l0.jpg'
                }];
            const action = [
                {
                    'type': 'GET_SPACESHIP',
                    'payload': response
                }
            ];
            mockAxios.onGet(`/api/products/:${spaceshipId}`).reply(200, response);

            return store.dispatch(fetchSingleSpaceship())
                .then(() => {
                    expect(store.getActions()).to.deep.equal(action);
                })
        })
    })
})
