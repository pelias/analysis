
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

// create one analyzer per locale, use the cache to return existing analyzers
// note: this avoids having to recreate the whole analyzer chain on each request.
module.exports.cache = function cache( analyzer ){
  var cache = {};
  return function( ctx ){
    var key = '';

    // detect locale from context
    if( ctx && 'string' === typeof ctx.locale && ctx.locale.length === 3 ){
      key = ctx.locale.toUpperCase();
    }

    // create new analyzer if one doesn't already exist
    if( !cache.hasOwnProperty( key ) ){
      cache[ key ] = analyzer( ctx );
    }

    // return analyzer
    return cache[ key ];
  };
};
