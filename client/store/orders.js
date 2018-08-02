import axios from 'axios'
import history from '../history'

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

const getHistory = orderHistory => {
    return {
        type: GET_ORDER_HISTORY,
        orderHistory
    }
}

export const fetchHistory = (userId) => dispatch => {
    return axios.get(`/api/users/orders/${userId}`)
        .then(res => res.data)
        .then(orderHistory => {
            dispatch(getHistory(orderHistory))
        })
        .catch(console.error('Fetching order history FAILED'));
}


export default function (state = [], action) {
    switch (action.type) {
        case GET_ORDER_HISTORY:
            return action.orderHistory;

        default:
            return state;
    }
}