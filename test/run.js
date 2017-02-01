var tape = require('tape');
var path = require('path');
var util = require('../lib/util');

var tests = [
  './lib/Token',
  './analyzer/split',
  './analyzer/unique',
  './analyzer/diacritic',
  './analyzer/charmap',
];

// test runner
tests.map( function( testpath ){

  var file = require( testpath );

  var test = function( name, func ) {
    return tape( path.normalize( testpath ) + ': ' + name , func );
  };

  for( var testCase in file ){
    if( 'function' === typeof file[testCase] ){
      file[testCase]( test , util );
    }
  }
});
