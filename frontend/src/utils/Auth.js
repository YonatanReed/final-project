export const BASE_URL = 'http://api.yonatanreed.mooo.com';
// https://api.yonatanreed.mooo.com
// http://localhost:3000

function processResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const authorize = (email, password) => {
  console.log('auth.js authorize');

  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(processResponse);
};

export const register = (email, password, name) => {
  console.log('auth.js register');

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then(processResponse);
};

export const checkToken = (token) => {
  console.log('auth.js checktoken');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(processResponse);
};
