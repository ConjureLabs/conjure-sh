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
  const req = new XMLHttpRequest();

  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  req.onreadystatechange = () => {
    if (req.readyState !== 4) {
      return;
    }

    const okay = req.status === 200;

    callback(
      !okay ? req.responseText : null,
      okay ? JSON.parse(req.responseText) : null
    );
  };

  req.open('POST', url);
  req.send(data);
}

