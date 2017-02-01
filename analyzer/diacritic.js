
var through = require('through2'),
    removeAccents = require('remove-accents');

/**
  diacritic - remove accents from characters
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    token.body = removeAccents( token.body );
    this.push( token );

    next();
  });
}

module.exports = factory;
