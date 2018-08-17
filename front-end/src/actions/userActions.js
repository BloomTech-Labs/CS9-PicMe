import { FETCH_USER, NEW_USER } from './types';
import axios from 'axios';

const url = "http://localhost:5000/"

export function fetchUser () {
    return (dispatch) => {
        console.log("User reached fetch user action: ")
        //.then((res) => {
            let inUser = dispatch({type: FETCH_USER, inUser})
        //}).catch((err) => {
            //console.log(err)
        //})
    }
};

export function newUser (userObject) {
    return (dispatch) => {
        console.log("User reached newUser action: ")
        //.then((res) => {
            let newUser = dispatch({type: 'NEW_USER', newUser})
        //}).catch((err) => {
            //console.log(err)
        //})
    }
};