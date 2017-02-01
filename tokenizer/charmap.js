
var through = require('through2'),
    replace = require('batch-replace'),
    util = require('../lib/util');

/**
  charmap - replace characters inside tokens

  options:
  - map [object] - map all occurrences of {key} to {value}
**/

function factory( options ){
  options = options || {};
  options.map = options.map || {};

  // build regular expressions for replacements
  var replacements = [];
  for( var key in options.map ){
    replacements.push({
      pattern: new RegExp( util.regex.escape( key ), 'g' ),
      replace: options.map[ key ]
    });
  }

  // replace characters in body
  return through.obj( function( token, _, next ){

    // perform replacements
    token.body = replace( token.body, replacements );

    // do not emit empty tokens
    if( token.body.length ){
      this.push( token );
    }

    next();
  });
}

module.exports = factory;
