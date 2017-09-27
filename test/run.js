var tape = require('tape');
var path = require('path');
var util = require('../lib/util');

var tests = [
  './config/address_suffix',
  './config/character_map',
  './config/dictionary',
  './config/directionals',
  './config/first_token',
  './tokenizer/unique',
  './tokenizer/diacritic',
  './tokenizer/disjoin',
  './tokenizer/charmap',
  './tokenizer/lowercase',
  './tokenizer/lettercase',
  './tokenizer/ordinals',
  './tokenizer/singular',
  './tokenizer/synonyms',
  './tokenizer/prefixngram',
  './analyzer/example',
  './analyzer/street'
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
