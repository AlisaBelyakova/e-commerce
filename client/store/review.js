import axios from 'axios';

/*** ACTION TYPES ***/
const GET_REVIEWS = 'GET_REVIEWS';

/*** ACTION CREATORS ***/
const getReviews = reviews => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


/*** THUNK CREATORS ***/
export const fetchReviews = (spaceshipId) => {
    return dispatch => {
        return axios.get(`/api/products/reviews/${spaceshipId}`)
            .then(res => res.data )
            .then(reviews => {
                console.log('here are the formatted reviews in the thunk', reviews)
                dispatch(getReviews(reviews))
            })
            .catch(console.error)
    }
}


/*** REDUCER ***/
export default function (state = [], action) {
    switch (action.type) { 
        case GET_REVIEWS:
            return action.reviews;
        default:
            return state
    }
}