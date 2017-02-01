var Token = require('../../lib/Token');
var synonyms = require('../../analyzer/synonyms');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof synonyms, 'function', 'factory is a function');
    t.equal(synonyms.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = synonyms( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.synonyms = function(test, util) {
  test('default settings', function(t) {

    var map = {
      'a': 'atest',
      'b': 'btest'
    };

    var analyzer = synonyms({ map: map });
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'atest', 'first token' );
      t.equal( tokens[1].body, 'btest', 'second token' );
      t.equal( tokens[2].body, 'c', 'third token' );
      t.equal( tokens[3].body, 'abacus', 'fourth token' );
      t.end();
    }));

    analyzer.write( new Token( 'a' ) );
    analyzer.write( new Token( 'b' ) );
    analyzer.write( new Token( 'c' ) );
    analyzer.write( new Token( 'abacus' ) );
    analyzer.end();
  });

  test('keep original', function(t) {

    var map = {
      'a': 'atest',
      'b': 'btest'
    };

    var analyzer = synonyms({ map: map, keepOriginal: true });
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'a', 'first token' );
      t.equal( tokens[1].body, 'atest', 'first token' );
      t.equal( tokens[2].body, 'b', 'second token' );
      t.equal( tokens[3].body, 'btest', 'second token' );
      t.equal( tokens[4].body, 'c', 'third token' );
      t.equal( tokens[5].body, 'abacus', 'fourth token' );
      t.end();
    }));

    analyzer.write( new Token( 'a' ) );
    analyzer.write( new Token( 'b' ) );
    analyzer.write( new Token( 'c' ) );
    analyzer.write( new Token( 'abacus' ) );
    analyzer.end();
  });
};

module.exports.addresses = function(test, util) {
  test('address suffix expansion', function(t) {

    var map = {
      'st\x03': 'street\x03',
      'rd\x03': 'road\x03',
      'ave\x03': 'avenue\x03'
    };

    var analyzer = synonyms({ map: map });
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'street\x03', 'first token' );
      t.equal( tokens[1].body, 'road\x03', 'second token' );
      t.equal( tokens[2].body, 'avenue\x03', 'third token' );
      t.end();
    }));

    analyzer.write( new Token( 'st\x03' ) );
    analyzer.write( new Token( 'rd\x03' ) );
    analyzer.write( new Token( 'ave\x03' ) );
    analyzer.end();
  });
};
