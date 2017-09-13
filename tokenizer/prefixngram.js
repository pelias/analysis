
/**
  prefixngram - split token in to prefix grams
**/

function prefixngram( res, cur ){

  var chars = cur.split('');
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
