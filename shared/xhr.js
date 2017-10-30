import { stringify } from 'querystring';

// todo: need to update get and post to return an error if http statusCode !== 200

export function get(url, data, callback) {
  fetch(`${url}${data ? '?' : ''}${stringify(data)}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          throw new Error(json.message || response.statusText);
        });
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
    credentials: 'include',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          throw new Error(json.message || response.statusText);
        });
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

export function del(url, data, callback) {
  fetch(`${url}${data ? '?' : ''}${stringify(data)}`, {
    method: 'DELETE',
    credentials: 'include',
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          throw new Error(json.message || response.statusText);
        });
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
