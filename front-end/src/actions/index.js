import axios from 'axios';

export const CHARGE_SUCCESS = 'CHARGE_SUCCESS';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const REFRESH_USER = 'REFRESH_USER';

export const buyCredits = payload => {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API}/charge`, payload, {
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.token}`
      }
    })
      .then(response => {
        dispatch({ type: CHARGE_SUCCESS, payload: response.data });
      })
      .catch(err => console.log(err));
  }
};

export const signIn = (email, password) => {
  return dispatch => {
    return axios.post(`${process.env.REACT_APP_API}/signin`, {
        email: email, 
        password: password
    })
    .then(response => {
        dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
        return response;
    })
    .catch(err => {
      alert("Invalid login credentials, please try again.");
      console.log(err);
    });
  }
};

export const refreshUserState = () => {
  return dispatch => {
    const email = sessionStorage.getItem('email');
    axios.get(`${process.env.REACT_APP_API}/currentuser?email=${email}`)
      .then(response => {
        dispatch({ type: REFRESH_USER, payload: response.data });
      })
      .catch(err => console.log(err));
  }
};
