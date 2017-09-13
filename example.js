
var removeAccents = require('remove-accents');

function A( res, cur ){
  res.push( cur + ' A' );
  return res;
}

function B( res, cur, pos, arr ) {
  for( var i=0; i<5; i++ ){
    res.push( cur + ' B' + i );
  }
  return res;
}

function diacritics( res, cur ){
  res.push( removeAccents( cur ) );
  return res;
}

function done( token ){
  console.log( token );
}

function analyzer(){
  var pipes = Array.prototype.slice.call( arguments );
  return function( tokens ){
    for( var i=0; i<pipes.length; i++ ){
      tokens = tokens.reduce( pipes[i], [] );
    }
    return tokens;
  };
}

var ctx = { locale: 'eng' };

var a = analyzer(
  A.bind(ctx),
  B.bind(ctx),
  diacritics.bind(ctx)
);

var foo = ['Špindlerův Mlýn', 'bar'];

// console.log( a(['test']) );
console.log( foo );
console.log( a(foo) );
console.log( foo );
