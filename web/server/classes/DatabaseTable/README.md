### DatabaseTable

This classes serves as a proxy to database tables, making it easier to select, insert, etc.

#### Select

##### Using Constructor

```js
const account = new DatabaseTable('Account');

// SELECT * FROM account;
account.select((err, rows) => {
  // ...
});

// SELECT * FROM account WHERE id = 1 AND name = 'Tim Marshall';
account.select({
  id: 1,
  name: 'Tim Marshall'
}, (err, rows) => {
  // ...
});

// SELECT * FROM account WHERE (id = 1 AND name = 'Tim Marshall') OR (id = 2);
accont.select({
  id: 1,
  name: 'Tim Marshall'
}, {
  id: 2
}, (err, rows) => {
  // ...
})
```

##### Direct (static) call

```js
// SELECT * FROM account;
DatabaseTable.select('account', (err, rows) => {
  // ...
});

// SELECT * FROM account WHERE id = 1 AND name = 'Tim Marshall';
DatabaseTable.select('account', {
  id: 1,
  name: 'Tim Marshall'
}, (err, rows) => {
  // ...
});
```
