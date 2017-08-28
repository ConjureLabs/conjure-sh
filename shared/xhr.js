import queryString from 'query-string';

// todo: need to update get and post to return an error if http statusCode !== 200

export function get(url, data, callback) {
  fetch(`${url}${data ? '?' : ''}${queryString.stringify(data)}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
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
        throw new Error(response.statusText);
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
  fetch(`${url}${data ? '?' : ''}${queryString.stringify(data)}`, {
    method: 'DELETE',
    credentials: 'include',
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
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
