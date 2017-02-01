
var through = require('through2');

/**
  synonyms - replace tokens with synonyms

  options:
  - map [object] - map all occurrences of {key} to {value}
  - keepOriginal [bool] - also keep the original token
  - position [int] - only replace tokens at this term position
**/

function factory( options ){
  options = options || {};
  options.map = options.map || {};

  return through.obj( function( token, _, next ){

    // only substitute tokens in certain position
    if( !options.hasOwnProperty('position') || options.position === token.position ){

      // check map for substitution
      if( options.map.hasOwnProperty( token.body ) ){

        // $keepOriginal flag allows control over whether
        // the original token is discarded or not.
        if( true === options.keepOriginal ){
          var token2 = token.clone();
          this.push( token2 );
        }

        // replace token with synonym
        token.body = options.map[ token.body ];
      }
    }

    this.push( token );
    next();
  });
}

module.exports = factory;
