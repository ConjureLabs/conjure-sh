'use strict';

export function get(url, callback) {
  fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        return new Error(Response.statusText);
      }
      return response.json();
    })
    .then(json => {
      callback(null, json);
    })
    .catch(err => {
      callback(err);
    });
}

export function post(url, data, callback) {
  console.log(data, JSON.stringify(data));
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        return new Error(Response.statusText);
      }
      return response.json();
    })
    .then(json => {
      callback(null, json);
    })
    .catch(err => {
      callback(err);
    });
}
