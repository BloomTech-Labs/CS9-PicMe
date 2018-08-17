import { NEW_USER, FETCH_USER } from '../actions/types';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    credits: null
};

export default function(state = initialState, action) {
        switch (action.type) {
        case NEW_USER:
        console.log("got to new user reducer");
            const tempState = {
                ...state,
                user: action.payload
            };
            console.log("Got to new user state:", tempState);
            return tempState;
        case FETCH_USER:
        console.log("got to fetch reducer");
            const tempState2 = {
                ...state,
                user: action.payload
            };
        default:
            console.log("action.type is: ", action.type);
            return state;
    }
}
