
var removeAccents = require('remove-accents');

/**
  diacritic - remove accents from characters
**/

function diacritic( res, word ){
  res.push( removeAccents( word ) );
  return res;
}

module.exports = diacritic;
