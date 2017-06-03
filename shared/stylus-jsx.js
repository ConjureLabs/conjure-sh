const stylus = require('stylus');
const path = require('path');
const fs = require('fs');

const x = fs.readFileSync(path.resolve(__dirname, 'styles.styl'), 'utf8');
console.log(x);

stylus(x)
  .set('filename', __dirname + '/styles.styl')
  .render(function(err, css){
    console.log(err);
    console.log(css);
  });