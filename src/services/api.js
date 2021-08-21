import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',

  },
});

const setTokenInStorage = (token) => {
  localStorage.setItem("token", token);
}

const getTokenInStorage = () => {
  return localStorage.getItem("token");
}

function decodeToken () {
  const token = localStorage.getItem("token");

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(JSON.parse(jsonPayload).userDetails);

};

export { API, setTokenInStorage, getTokenInStorage, decodeToken };