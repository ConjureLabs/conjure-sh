'use strict';

export function get(url, callback) {
  fetch(url, {
    method: 'GET',
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
  fetch(url, {
    method: 'POST',
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

