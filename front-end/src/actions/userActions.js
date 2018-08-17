import { FETCH_USER, NEW_USER } from './types';
import axios from 'axios';

const url = "http://localhost:5000/"

export function fetchUser () {
    return (dispatch) => {
        axios.get(`${url}/signin`)
        .then((res) => {
            let inUser = res.dispatch({type:'FETCH_USER', inUser})
        }).catch((err) => {
            console.log(err)
        })
    }
};

export function newUser () {
    return (dispatch) => {
        axios.post(`${url}/register`)
        .then((res) => {
            let newUser = res.dispatch({type: 'NEW_USER', newUser})
        }).catch((err) => {
            console.log(err)
        })
    }
};