import { faLongArrowAltUp, faRegistered } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import React from 'react'

const URL = "http://localhost:8080/authenticate";

export default function AuthService() {
    
    
}

export const login = (username, password) => {
    
    return axios.post(URL, {username, password})
    .then(
        response => {
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch(error=>alert(error));
        
}

export let logout = () => {
    localStorage.removeItem("user");
};

export let register = (userRegistrationDetails) =>{
    return axios.post(URL+"/register", userRegistrationDetails);
}

export let getCurrentuser = () => {
    return JSON.parser(localStorage.getItem("user"));
}
