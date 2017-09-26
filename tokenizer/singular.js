
var inflection = require('inflection');

/**
  singular - convert token to singular form
**/

function singular( res, word ){

  if( word.length > 3 ){
    res.push( inflection.singularize( word ) );
  } else {
    res.push( word );
  }

  return res;
}

module.exports = singular;
