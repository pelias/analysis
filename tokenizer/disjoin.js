
/**
  disjoin - split compound words in to constituent parts

  context:
  - map [object] - map all occurrences of {key} to {value}
  - split [bool] - whether to split compound word in to two words (true) or leave as one (false)
**/

function disjoin( res, word ){

  if( !this.map ){ throw new Error( 'invalid map' ); }

  for( var suffix in this.map ){
    if( word.length <= suffix.length ){ continue; }
    if( word.slice( -suffix.length ) === suffix ){
      var suffixStartPosition = word.length - suffix.length;
      // note: do not seperate where the preceding character is a word boundary
      if( true === this.split && !/^[\b-]$/.test( word[ suffixStartPosition -1 ] ) ){
        res.push( word.slice( 0, suffixStartPosition ) );
        res.push( this.map[suffix] );
      } else {
        res.push( word.slice( 0, word.length - suffix.length ) + this.map[suffix] );
      }
      return res;
    }
  }

  res.push( word );

  return res;
}

module.exports = disjoin;
