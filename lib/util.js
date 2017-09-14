
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

// create one analyzer per property (default 'locale'), use the cache to return existing analyzers
// note: this avoids having to recreate the whole analyzer chain on each request.
module.exports.cache = function( analyzer, prop ){

  var cache = {};

  // default the expected context property to 'locale'
  if( 'string' !== typeof prop || !prop.length ){ prop = 'locale'; }

  return function( ctx ){

    // detect cache key from context
    var key = ( ctx && 'string' === typeof ctx[ prop ] && ctx[ prop ].length ) ? ctx[ prop ] : '';

    // create new analyzer if one doesn't already exist
    if( !cache.hasOwnProperty( key ) ){
      cache[ key ] = analyzer( ctx );
    }

    // return analyzer
    return cache[ key ];
  };
};
