var Token = require('../../lib/Token');
var ordinals = require('../../analyzer/ordinals');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof ordinals, 'function', 'factory is a function');
    t.equal(ordinals.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = ordinals( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.ordinals = function(test, util) {
  test('multiple in same string', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1 2 3 4 5', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '1st 2nd 3rd 4th 5th' ) );
    analyzer.end();
  });
  test('singles', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1', 'ordinals removed' );
      t.equal( tokens[1].body, '2', 'ordinals removed' );
      t.equal( tokens[2].body, '3', 'ordinals removed' );
      t.equal( tokens[3].body, '4', 'ordinals removed' );
      t.equal( tokens[4].body, '5', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '1st' ) );
    analyzer.write( new Token( '2nd' ) );
    analyzer.write( new Token( '3rd' ) );
    analyzer.write( new Token( '4th' ) );
    analyzer.write( new Token( '5th' ) );
    analyzer.end();
  });
  test('variable size', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1', 'ordinals removed' );
      t.equal( tokens[1].body, '22', 'ordinals removed' );
      t.equal( tokens[2].body, '333', 'ordinals removed' );
      t.equal( tokens[3].body, '4444', 'ordinals removed' );
      t.equal( tokens[4].body, '2500', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '1st' ) );
    analyzer.write( new Token( '22nd' ) );
    analyzer.write( new Token( '333rd' ) );
    analyzer.write( new Token( '4444th' ) );
    analyzer.write( new Token( '2500th' ) );
    analyzer.end();
  });
  test('teens', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11 12 13 14 15 16 17 18 19 20', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '11th 12th 13th 14th 15th 16th 17th 18th 19th 20th' ) );
    analyzer.end();
  });
  test('teens (hundreds)', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '111 112 113 114 115 116 117 118 119 120', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '111th 112th 113th 114th 115th 116th 117th 118th 119th 120th' ) );
    analyzer.end();
  });
  test('teens (wrong suffix)', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11st 12nd 13rd 111st 112nd 113rd', 'ordinals ignored' );
      t.end();
    }));

    analyzer.write( new Token( '11st 12nd 13rd 111st 112nd 113rd' ) );
    analyzer.end();
  });
  test('uppercase', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '1 22 333 4444', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '1ST 22ND 333RD 4444TH' ) );
    analyzer.end();
  });
  test('autocomplete', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '26', 'ordinals removed' );
      t.equal( tokens[1].body, '26', 'ordinals removed' );
      t.equal( tokens[2].body, '26', 'ordinals removed' );
      t.equal( tokens[3].body, '3', 'ordinals removed' );
      t.equal( tokens[4].body, '3', 'ordinals removed' );
      t.equal( tokens[5].body, '3', 'ordinals removed' );
      t.end();
    }));

    analyzer.write( new Token( '26' ) );
    analyzer.write( new Token( '26t' ) );
    analyzer.write( new Token( '26th' ) );
    analyzer.write( new Token( '3' ) );
    analyzer.write( new Token( '3r' ) );
    analyzer.write( new Token( '3rd' ) );
    analyzer.end();
  });
  test('wrong suffix (do nothing)', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth', 'ordinals ignored' );
      t.end();
    }));

    analyzer.write( new Token( '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth' ) );
    analyzer.end();
  });
  test('trim leading zero', function(t) {

    var analyzer = ordinals();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '11', '201', 'zeros removed' );
      t.end();
    }));

    analyzer.write( new Token( '011th', '0000201st' ) );
    analyzer.end();
  });
};
