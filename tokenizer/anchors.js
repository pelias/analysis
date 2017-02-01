
var through = require('through2'),
    Token = require('../lib/Token');

/**
  anchors - add anchor chars to tokens
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    if( token.isComplete && token.body.length ){
      token.body += Token.anchor;
    }
    this.push( token );

    next();
  });
}

module.exports = factory;
