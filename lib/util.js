
var through = require('through2'),
    diff = require('difflet')({ indent : 2, comment : true });

// convenience function for testing analyzer streams
module.exports.collect = function( assert ){

  var stream = through.obj( function( token, _, next ){
    stream.tokens.push( token );
    next();
  }, function ( next ){
    assert( stream.tokens );
    next();
  });

  stream.tokens = [];
  return stream;
};

// a visual deep diff rendered using console.error()
module.exports.diff = function( actual, expected ){
  console.error( diff.compare( actual, expected ) );
};
