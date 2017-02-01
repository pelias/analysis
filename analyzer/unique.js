
var through = require('through2');

/**
  unique - remove duplicate tokens
**/

function factory( options ){
  options = options || {};

  // keep track of tokens we have already seen in this stream
  var seen = {};

  return through.obj( function( token, _, next ){

    // only push unique tokens downstream
    if( !seen.hasOwnProperty( token.body ) ){
      seen[ token.body ] = true;
      this.push( token );
    }

    next();
  });
}

module.exports = factory;
