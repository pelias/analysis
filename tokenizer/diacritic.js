
var removeAccents = require('remove-accents');

/**
  diacritic - remove accents from characters
**/

function diacritic( res, cur ){
  res.push( removeAccents( cur ) );
  return res;
}

module.exports = diacritic;
