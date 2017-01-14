'use strict';

const slice = Array.prototype.slice;

module.exports = class DatabaseTable {
  constructor(tableName) {
    this.tableName = tableName;
  }

  select(/* [constraints, ...,] callback */) {
    const database = require('modules/database');

    const constraints = slice.call(arguments);
    const callback = constraints.pop(); // callback is assumed to always be last arg
    let whereClause = '';
    const whereValues = [];

    buildWhereClause: {
      if (!constraints.length) {
        break buildWhereClause;
      }

      whereClause = ' WHERE ';

      if (constraints.length === 1) {
        whereClause += generateAndConstraints(constraints[0], whereValues);
        break buildWhereClause;
      }

      whereClause += constraints
        .map(constr => {
          return `(${generateAndConstraints(constr, whereValues)})`;
        })
        .join(' OR ');
    }

    database.query(`SELECT * FROM ${tableName}${whereClause}`, whereValues, (err, result) => {
      if (err) {
        return callback(err)
      }

      const DatabaseRow = require('classes/DatabaseRow');
      return callback(null, results.rows.map(row => {
        return new DatabaseRow(tableName, row);
      }));
    });
  }

  static select(/* tableName, [constraints, ...,] callback */) {
    const args = slice.call(arguments);
    const tableName = args.shift();
    const instance = new DatabaseTable(tableName);
    instance.select.apply(instance, args);
  }
}

function generateAndConstraints(constraints, valuesArray) {
  return constraints
    .map((key, i) => {
      valuesArray.push(constraints[key]);
      return `${key} = $${valuesArray.length}`;
    })
    .join(' AND ');
}
