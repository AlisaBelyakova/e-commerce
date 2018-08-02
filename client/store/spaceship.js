import axios from 'axios';

/*** ACTION TYPES ***/
const GET_SPACESHIP = 'GET_SPACESHIP';

/*** ACTION CREATORS ***/
//get single spaceship
const getSpaceship = spaceship => {
    return {
        type: GET_SPACESHIP,
        spaceship
    }
}



/*** THUNK CREATORS ***/
export const fetchSingleSpaceship = (spaceshipId) => {
    return dispatch => {
        return axios.get(`/api/products/${spaceshipId}`)
            .then(res => res.data)
            .then(spaceship => {
                dispatch(getSpaceship(spaceship))
            })
            .catch(console.error)
    }
}



/*** REDUCER ***/
export default function (state = {}, action) {
    switch (action.type) {
        case GET_SPACESHIP:
            return action.spaceship;
        default:
            return state
    }
}