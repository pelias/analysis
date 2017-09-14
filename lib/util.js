
var diff = require('difflet')({ indent : 2, comment : true });

// a visual deep diff rendered using console.error()
module.exports.diff = function( actual, expected ){
  console.error( diff.compare( actual, expected ) );
};

// regex util functions
module.exports.regex = {
  escape: function( str ){
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
};

// merge objects
module.exports.merge = function(){
  return Object.assign.apply( null, [{}].concat( Array.prototype.slice.call( arguments ) ) );
};

// create a chain of reducers
module.exports.chain = function(){
  var pipes = Array.prototype.slice.call( arguments );
  var split = this.split || /\s+/;
  var join = this.join || ' ';

  return function( text ){
    var tokens = text.split( split );
    for( var i=0; i<pipes.length; i++ ){
      tokens = tokens.reduce( pipes[i], [] );
    }
    return tokens.join( join );
  };
};
