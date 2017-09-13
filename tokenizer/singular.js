
var inflection = require('inflection');

/**
  singular - convert token to singular form
**/

function singular( res, cur ){

  res.push( cur.split(/\s+/).map( word => {
    return word.length > 3 ? inflection.singularize( word ) : word;
  }).join(' ') );

  return res;
}

module.exports = singular;
