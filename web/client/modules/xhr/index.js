'use strict';

export function getJSON(url, callback) {
  const req = new XMLHttpRequest();

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

  req.open('GET', url);
  req.send();
}
