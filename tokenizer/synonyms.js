
/**
  synonyms - replace tokens with synonyms

  context:
  - map [object] - map all occurrences of {key} to {value}
  - position [int] - only replace tokens at this term position
**/

function synonyms( res, cur ){

  if( !this.map ){ throw new Error( 'invalid map' ); }

  // split words
  var words = cur.split(/\s+/);

  res.push( words.map(( word, pos ) => {

    // only substitute tokens in certain position (allow negative positions)
    if( !this.hasOwnProperty('position') || pos === ( this.position >= 0 ? this.position : this.position + words.length ) ){

      // check map for substitution
      if( this.map.hasOwnProperty( word ) ){

        // replace token with synonym
        return this.map[ word ];
      }
    }

    return word;

  }, this).join(' ') );

  return res;
}

module.exports = synonyms;
