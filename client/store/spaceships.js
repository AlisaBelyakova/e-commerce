import axios from 'axios';

/*** ACTION TYPES ***/
const GET_SPACESHIPS = 'GET_SPACESHIPS';
const GET_BY_VESSEL_TYPE = 'GET_BY_VESSEL_TYPE';
const UPDATE_SPACESHIP = 'UPDATE_SPACESHIP';
const ADD_SPACESHIP = 'ADD_SPACESHIP'



/*** ACTION CREATORS ***/
const getSpaceships = spaceships => {
    return {
        type: GET_SPACESHIPS,
        spaceships
    }
}
//get spaceships by category
const getByVesselType = spaceships => {
    return {
        type: GET_BY_VESSEL_TYPE,
        spaceships
    }
}
//update product/spaceship, oh baby
const updateSpaceship = spaceship => {
    return {
        type: UPDATE_SPACESHIP,
        spaceship
    }
}

export const addSpaceship = spaceship => {
    return {
        type: ADD_SPACESHIP,
        spaceship
    }
}

/*** THUNK CREATORS ***/
//fetch all them spaceships
export const fetchSpaceships = () => {
    return dispatch => {
        return axios.get('/api/products')
            .then(res => {
                return res.data
            })
            .then(spaceships => {
                dispatch(getSpaceships(spaceships))
            })
            .catch(err => console.error('Fetching products/spaceships unsuccessful', err));
    };
}

//fetch spaceship by it's type/category
export const fetchByVesselType = (vesselType) => dispatch => {
    return axios.get(`/api/products/categories/${vesselType}`)
        .then(res => res.data)
        .then(spaceships => {
            dispatch(getByVesselType(spaceships))
        })
        .catch(console.error('Fetching products/spaceships by vessel type FAILED', err));
}

//update a spaceship/product(which is a spaceship, because that is what we are selling)
export const updateSpaceshipInfo = (id, spaceship) => dispatch => {
    return axios.put(`/api/products/${id}`, spaceship)
        .then(res => dispatch(updateSpaceship(res.data)))
        .catch(err => console.error(`Updating the spaceship product :${spaceship} FAILED`, err))
};



/*** REDUCER ***/
export default function (state = [], action) {
    switch (action.type) {
        case GET_SPACESHIPS:
            return action.spaceships;

        case GET_BY_VESSEL_TYPE:
            return action.spaceships;

        case UPDATE_SPACESHIP:
            return state.map(spaceship => (
                action.spaceship.id === spaceship.id ? action.spaceship : spaceship
            ))

        case ADD_SPACESHIP:
            return state.concat([action.spaceship])

        default: return state
    }
}


