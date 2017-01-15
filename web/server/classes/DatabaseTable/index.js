'use strict';

const slice = Array.prototype.slice;

// todo: add a common prefix to any symbol constant?
const queryCallback = Symbol('database.query callback');
const staticProxy = Symbol('static method, proxy to instance method');

module.exports = class DatabaseTable {
  constructor(tableName) {
    this.tableName = tableName;
  }

  select(/* [constraints, ...,] callback */) {
    const database = require('modules/database');

    const args = slice.call(arguments);
    const callback = args.pop(); // callback is assumed to always be last arg
    const constraints = args; // anything left in arguments will be considered constraints
    const queryValues = [];

    const whereClause = generateWhereClause(constraints, queryValues);

    database.query(`SELECT * FROM ${this.tableName}${whereClause}`, queryValues, this[queryCallback]);
  }

  static update() {
    return this[staticProxy]('select', arguments);
  }

  update(/* updates, [constraints, ...,] callback */) {
    const database = require('modules/database');

    const args = slice.call(arguments);
    const updates = args.shift(); // updates is assumed to always be the first arg
    const callback = args.pop(); // callback is assumed to always be last arg
    const constraints = args; // anything left in arguments will be considered constraints
    let whereClause = '';
    const queryValues = [];

    const updatesSql = generateSqlKeyVals(', ', updates, queryValues);
    const whereClause = generateWhereClause(constraints, queryValues);

    database.query(`UPDATE ${this.tableName} SET ${updatesSql}${whereClause}`, queryValues, this[queryCallback]);
  }

  static update() {
    return this[staticProxy]('update', arguments);
  }

  [queryCallback](err, result) {
    if (err) {
      return callback(err)
    }

    const DatabaseRow = require('classes/DatabaseRow');
    return callback(null, results.rows.map(row => {
      return new DatabaseRow(this.tableName, row);
    }));
  }

  [staticProxy](methodName, arguments /* [ tableName, [constraints, ...,] callback ] */) {
    const args = slice.call(arguments);
    const tableName = args.shift();
    const instance = new DatabaseTable(tableName);
    instance[methodName].apply(instance, args);
  }
}

function generateSqlKeyVals(separator, dict, valuesArray) {
  return Object.keys(dict)
    .map((key, i) => {
      valuesArray.push(dict[key]);
      return `${key} = $${valuesArray.length}`;
    })
    .join(separator);
}

/*
  constraints should be an array of constraint {} objects
  e.g. [{ id: 1 }, { id: 2 }]
 */
function generateWhereClause(constraints, queryValues) {
  if (!constraints.length) {
    return '';
  }

  if (constraints.length === 1) {
    return ' WHERE ' + generateSqlKeyVals(' AND ', constraints[0], queryValues);
  }

  return ' WHERE ' + constraints
    .map(constr => {
      return `(${generateSqlKeyVals(' AND ', constr, queryValues)})`;
    })
    .join(' OR ');
}
