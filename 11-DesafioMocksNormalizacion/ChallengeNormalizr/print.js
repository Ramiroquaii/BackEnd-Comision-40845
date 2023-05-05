const util = require('util');
const holding = require('./holding');

module.exports = {
  examine: (data) => {
    // console.log(util.inspect(data, false, 4, true));

    // console.log(`Objeto original: ${JSON.stringify(holding).length} bytes`);
    console.log(`Objeto normalizado: ${JSON.stringify(data).length} bytes`);
  }
};