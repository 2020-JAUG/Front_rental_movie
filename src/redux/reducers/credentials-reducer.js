import { LOGIN, LOGOUT, UPDATE_USER, LEFT_USER } from '../types';

const initialState = {
    user : {},
    admin: {},
    token : ''
};

const credentialsReducer = (state = initialState, action) => {

    switch(action.type){
        case LOGIN :
            return action.payload;

        case LOGOUT :
            return initialState;

        case UPDATE_USER:
            return {...state, user: action.payload}

        case LEFT_USER:
            return {...state, user: action.payload}

        default:
            return state
    }
}

export default credentialsReducer;