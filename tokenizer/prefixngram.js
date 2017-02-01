
var through = require('through2');

/**
  prefixngram - split token in to prefix grams
**/

function factory( options ){
  options = options || {};

  return through.obj( function( token, _, next ){

    var chars = token.body.split('');
    var buffer = '';

    chars.forEach( function( char ){

      // buffer prefix
      buffer += char;

      // clone token
      var t = token.clone();
      t.body = buffer;
      this.push( t );

    }, this);

    next();
  });
}

module.exports = factory;
