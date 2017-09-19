
/**
  disjoin - split compound words in to constituent parts

  context:
  - map [object] - map all occurrences of {key} to {value}
**/

function disjoin( res, word ){

  if( !this.map ){ throw new Error( 'invalid map' ); }

  for( var suffix in this.map ){
    if( word.length <= suffix.length ){ continue; }
    if( word.slice( -suffix.length ) === suffix ){
      res.push( word.slice( 0, word.length - suffix.length ) + this.map[suffix] );
      return res;
    }
  }

  res.push( word );

  return res;
}

module.exports = disjoin;
