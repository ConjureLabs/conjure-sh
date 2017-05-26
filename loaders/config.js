const config = require('conjure-core/modules/config');

const configExpr = /([^\w])(config\.\w[\.\w]*)/gm;

module.exports = source => {
  const newSource = source.replace(configExpr, (_, leadingSpace, configPath) => {
    console.log(configPath);
    return `${leadingSpace}${dotNotationToConfig(configPath)}`;
  });

  return newSource;
};

function dotNotationToConfig(notation) {
  const tokens = notation.split('.');
  tokens.shift(); // shift off "config"

  const value = tokens.reduce((walked, token) => {
    return walked[token];
  }, config);

  switch (typeof value) {
    case 'number':
      return value;

    default:
      return `'${value}'`;
  }
}
