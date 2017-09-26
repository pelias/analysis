
/**
  synonyms - replace tokens with synonyms

  context:
  - map [object] - map all occurrences of {key} to {value}
  - positions [array of ints] - only replace tokens at this term positions
**/

function synonyms( res, word, pos, arr ){

  if( !this.map ){ throw new Error( 'invalid map' ); }

  // only substitute tokens in certain positions (allow negative positions)
  if( !Array.isArray( this.positions ) || this.positions.some( termpos => {
    return pos === ( termpos >= 0 ? termpos : termpos + arr.length )
  })){

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
