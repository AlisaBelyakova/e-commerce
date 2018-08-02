import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

/**
 * INITIAL STATE
 */
const currentCart = [];

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })

//add spaceship to the cart 
const addToCart = spaceship => {
    return {
        type: ADD_TO_CART,
        spaceship
    }
}

const changeQuantity = quantity => {
    return {
        type: CHANGE_QUANTITY,
        quantity
    }
}
/**
 * THUNK CREATORS
 */
export const myCart = (userId) => dispatch => {
    return axios.get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then(items => dispatch(getCart(items)))
        .catch(err => console.log(err))
}

export const removeCart = (userId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart`)
        .then(() => { console.log('cart was deleted') })
        .catch(err => console.log(err))
}

export const removeItem = (userId, orderId, spaceshipId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart/${orderId}/${spaceshipId}`)
        .then(() => { console.log('item was deleted') })
        .catch(err => console.log(err))
}

export const postToCart = (userId, spaceshipId, orderId, quantity) => {
    return dispatch => {
        return axios.post(`/api/users/${userId}/cart/${orderId}/${spaceshipId}`, { quantity })
            .then(res => {
                console.log('POSTED SUCCESSFULLY ?!?!?!', res)
                dispatch(addToCart(res.data))
            })
            .catch(err => console.log(err))
    }
}

export const updateQuantity = (lineItemId, quantity) => {
    return dispatch => {
        return axios.put(`/cart/${lineItemId}`, { quantity })
        .then(res => dispatch(changeQuantity(quantity)))
        .catch(err => console.log(err))
    }
}

/**
 * REDUCER
 */
export default function (state = currentCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        case ADD_TO_CART:
            return state.concat([action.spaceship]);
        case CHANGE_QUANTITY:
            console.log('state in change quantity case in reducer', state)
        default:
            return state;
    }
}
