### Route

This class is used to construct the API and Views routes

Express route handlers are pushed into a `Route` instance.

The route verbs will be gathered from the filenames (like `get.js` or `patch.js`), and the full route tree will be constructed during the sync setup.

```js
const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  next();
});

module.exports = route;
```
