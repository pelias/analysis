
/**
  prefixngram - split token in to prefix grams
**/

function prefixngram( res, word ){

  var chars = word.split('');
  var buffer = '';

  chars.forEach( function( char ){

    // buffer prefix
    buffer += char;

    // clone token
    res.push( buffer );

  });

  return res;
}

module.exports = prefixngram;
