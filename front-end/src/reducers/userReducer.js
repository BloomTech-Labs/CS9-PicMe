import { NEW_USER, FETCH_USER } from '../actions/types';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nickName: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NEW_USER:
        console.log(state);
            return {
                ...state,
                user: action.payload
            };
        case FETCH_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
