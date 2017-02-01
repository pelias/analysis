
var through = require('through2');

/** options:

  markAllComplete [bool] - mark all tokens as isComplete:true
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    // split body on whitespace
    var words = token.body.split(/\s+/);

    // create one token per word
    words.forEach( function( word, pos ){

      var t = token.clone();
      t.body = word;
      t.position = pos+1;
      t.count = words.length;
      t.isComplete = options.markAllComplete || pos < ( words.length-1 );

      this.push( t );
    }, this);

    next();
  });
}

module.exports = factory;
