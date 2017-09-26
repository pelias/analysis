
var replace = require('batch-replace'),
    util = require('../lib/util');

/**
  charmap - replace characters inside tokens

  context:
  - map [object] - map all ocwordrences of {key} to {value}
**/

function charmap( res, word ){

  // build regular expressions for replacements (only once)
  if( !this.replacements ){
    this.replacements = [];
    if( !this.map ){ throw new Error( 'invalid map' ); }
    for( var key in this.map ){
      this.replacements.push({
        pattern: new RegExp( util.regex.escape( key ), 'g' ),
        replace: this.map[ key ]
      });
    }
  }

  // perform replacements
  var xformed = replace( word, this.replacements );

  // do not emit empty tokens
  if( xformed.length ){
    res.push( xformed );
  }

  return res;
}

module.exports = charmap;
