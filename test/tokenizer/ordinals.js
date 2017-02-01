var Token = require('../../lib/Token');
var ordinals = require('../../tokenizer/ordinals');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof ordinals, 'function', 'factory is a function');
    t.equal(ordinals.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = ordinals( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.ordinals = function(test, util) {
  test('multiple in same string', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1 2 3 4 5', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '1st 2nd 3rd 4th 5th' ) );
    tokenizer.end();
  });
  test('singles', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1', 'ordinals removed' );
      t.equal( tokens[1].body, '2', 'ordinals removed' );
      t.equal( tokens[2].body, '3', 'ordinals removed' );
      t.equal( tokens[3].body, '4', 'ordinals removed' );
      t.equal( tokens[4].body, '5', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '1st' ) );
    tokenizer.write( new Token( '2nd' ) );
    tokenizer.write( new Token( '3rd' ) );
    tokenizer.write( new Token( '4th' ) );
    tokenizer.write( new Token( '5th' ) );
    tokenizer.end();
  });
  test('variable size', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1', 'ordinals removed' );
      t.equal( tokens[1].body, '22', 'ordinals removed' );
      t.equal( tokens[2].body, '333', 'ordinals removed' );
      t.equal( tokens[3].body, '4444', 'ordinals removed' );
      t.equal( tokens[4].body, '2500', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '1st' ) );
    tokenizer.write( new Token( '22nd' ) );
    tokenizer.write( new Token( '333rd' ) );
    tokenizer.write( new Token( '4444th' ) );
    tokenizer.write( new Token( '2500th' ) );
    tokenizer.end();
  });
  test('teens', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11 12 13 14 15 16 17 18 19 20', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '11th 12th 13th 14th 15th 16th 17th 18th 19th 20th' ) );
    tokenizer.end();
  });
  test('teens (hundreds)', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '111 112 113 114 115 116 117 118 119 120', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '111th 112th 113th 114th 115th 116th 117th 118th 119th 120th' ) );
    tokenizer.end();
  });
  test('teens (wrong suffix)', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11st 12nd 13rd 111st 112nd 113rd', 'ordinals ignored' );
      t.end();
    }));

    tokenizer.write( new Token( '11st 12nd 13rd 111st 112nd 113rd' ) );
    tokenizer.end();
  });
  test('uppercase', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1 22 333 4444', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '1ST 22ND 333RD 4444TH' ) );
    tokenizer.end();
  });
  test('autocomplete', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '26', 'ordinals removed' );
      t.equal( tokens[1].body, '26', 'ordinals removed' );
      t.equal( tokens[2].body, '26', 'ordinals removed' );
      t.equal( tokens[3].body, '3', 'ordinals removed' );
      t.equal( tokens[4].body, '3', 'ordinals removed' );
      t.equal( tokens[5].body, '3', 'ordinals removed' );
      t.end();
    }));

    tokenizer.write( new Token( '26' ) );
    tokenizer.write( new Token( '26t' ) );
    tokenizer.write( new Token( '26th' ) );
    tokenizer.write( new Token( '3' ) );
    tokenizer.write( new Token( '3r' ) );
    tokenizer.write( new Token( '3rd' ) );
    tokenizer.end();
  });
  test('wrong suffix (do nothing)', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth', 'ordinals ignored' );
      t.end();
    }));

    tokenizer.write( new Token( '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth' ) );
    tokenizer.end();
  });
  test('trim leading zero', function(t) {

    var tokenizer = ordinals();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11', '201', 'zeros removed' );
      t.end();
    }));

    tokenizer.write( new Token( '011th', '0000201st' ) );
    tokenizer.end();
  });
};
