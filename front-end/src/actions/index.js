import axios from 'axios';

export const CHARGE_SUCCESS = 'CHARGE_SUCCESS';

export const buyCredits = payload => {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API}/charge`, payload)
      .then(response => {
        dispatch({ type: CHARGE_SUCCESS, payload: response.data });
      })
      .catch(err => console.log(err));
  }
};
