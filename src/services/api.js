import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Authorization': localStorage.getItem("token"),
    'Content-Type': 'application/json',
    Accept: 'application/json',

  },
});

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});

const setTokenInStorage = (token) => {
  localStorage.setItem("token", token);
}

const getTokenInStorage = () => {
  return localStorage.getItem("token");
}

function decodeToken (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const data = JSON.parse(JSON.parse(jsonPayload).userDetails);

  localStorage.setItem("username", data.email);
  localStorage.setItem("permission", data.permission);

  return JSON.parse(JSON.parse(jsonPayload).userDetails);

};

function resetStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("permission");
}

export { API, setTokenInStorage, getTokenInStorage, decodeToken, resetStorage };