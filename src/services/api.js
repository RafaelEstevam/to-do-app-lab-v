import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyRGV0YWlscyI6IntcImVtYWlsXCI6XCJhZG1pblwiLFwicGFzc3dvcmRcIjpudWxsLFwicGVybWlzc2lvblwiOlwiUk9MRV9BRE1JTlwiLFwidG9rZW5cIjpudWxsfSIsImlzcyI6ImJyLmdvdi5zcC5mYXRlYyIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjI5NjY1NDI3fQ.gN2nPx0WqxXKeHAIXLzSd-o9NOeeELXm7qhYFLVddylr1q9UeyS5OioUh28ZlfT_bAkkj_m3vyvh5Eymz_aBkA',
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