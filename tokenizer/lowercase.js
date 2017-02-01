
var through = require('through2');

/**
  lowercase - convert tokens to lowercase
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    token.body = token.body.toLowerCase();
    this.push( token );

    next();
  });
}

module.exports = factory;
