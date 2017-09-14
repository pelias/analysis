
var inflection = require('inflection');

/**
  singular - convert token to singular form
**/

function singular( res, cur ){

  if( cur.length > 3 ){
    res.push( inflection.singularize( cur ) );
  } else {
    res.push( cur );
  }

  return res;
}

module.exports = singular;
