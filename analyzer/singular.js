
var through = require('through2'),
    inflection = require('inflection');

/**
  singular - convert token to singular form
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    if( token.body.length > 3 ){
      token.body = inflection.singularize( token.body );
    }
    this.push( token );

    next();
  });
}

module.exports = factory;
