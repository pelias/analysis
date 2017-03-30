var tape = require('tape');
var path = require('path');
var util = require('../lib/util');

var tests = [
  './lib/Token',
  './tokenizer/split',
  './tokenizer/unique',
  './tokenizer/diacritic',
  './tokenizer/charmap',
  './tokenizer/lowercase',
  './tokenizer/ordinals',
  './tokenizer/singular',
  './tokenizer/anchors',
  './tokenizer/synonyms',
  './tokenizer/prefixngram',
  './analyzer/example/index',
  './analyzer/example/search',
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
