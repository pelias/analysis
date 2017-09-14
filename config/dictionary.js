
var fs = require('fs');
var path = require('path');

// load a libpostal dictionary from disk
// eg: https://raw.githubusercontent.com/openvenues/libpostal/master/resources/dictionaries/en/street_types.txt

module.exports = function( cc, filename ){

  var file = fs.readFileSync( path.resolve( __dirname, '..', 'dictionaries', cc, filename ) ).toString();
  var lines = file.trim().split('\n');

  var map = lines.reduce(( obj, line ) => {
    var cols = line.trim().split('|');
    cols.forEach(( col, pos ) => {
      if( !pos ){ return; } // skip first column ( the expansion )
      if( /[\.\s]/.test( col ) ){ return; } // skip multi-word and punctuated synonyms
      obj[ col ] = cols[ 0 ];
    });
    return obj;
  }, {});

  return map;
};
