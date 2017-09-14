
/**
  synonyms - replace tokens with synonyms

  context:
  - map [object] - map all occurrences of {key} to {value}
  - position [int] - only replace tokens at this term position
**/

function synonyms( res, word, pos, arr ){

  if( !this.map ){ throw new Error( 'invalid map' ); }

  // only substitute tokens in certain position (allow negative positions)
  if( !this.hasOwnProperty('position') || pos === ( this.position >= 0 ? this.position : this.position + arr.length ) ){

    // check map for substitution
    if( this.map.hasOwnProperty( word ) ){

      // replace token with synonym
      word = this.map[ word ];
    }
  }

  res.push( word );

  return res;
}

module.exports = synonyms;
