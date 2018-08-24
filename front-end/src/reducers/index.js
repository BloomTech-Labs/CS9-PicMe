import { CHARGE_SUCCESS } from '../actions';

const intialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  nicknames: '',
  credits: 0
}

export default (state = intialState, action) => {
  switch(action.type) {
    case CHARGE_SUCCESS:
      return { ...state, credits: action.payload.credits };

    default:
      return state;
  }
};
