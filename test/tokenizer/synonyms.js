var Token = require('../../lib/Token');
var synonyms = require('../../tokenizer/synonyms');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof synonyms, 'function', 'factory is a function');
    t.equal(synonyms.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = synonyms( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.synonyms = function(test, util) {
  test('default settings', function(t) {

    var map = {
      'a': 'atest',
      'b': 'btest'
    };

    var tokenizer = synonyms({ map: map });
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'atest', 'first token' );
      t.equal( tokens[1].body, 'btest', 'second token' );
      t.equal( tokens[2].body, 'c', 'third token' );
      t.equal( tokens[3].body, 'abacus', 'fourth token' );
      t.end();
    }));

    tokenizer.write( new Token( 'a' ) );
    tokenizer.write( new Token( 'b' ) );
    tokenizer.write( new Token( 'c' ) );
    tokenizer.write( new Token( 'abacus' ) );
    tokenizer.end();
  });

  test('keep original', function(t) {

    var map = {
      'a': 'atest',
      'b': 'btest'
    };

    var tokenizer = synonyms({ map: map, keepOriginal: true });
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'a', 'first token' );
      t.equal( tokens[1].body, 'atest', 'first token' );
      t.equal( tokens[2].body, 'b', 'second token' );
      t.equal( tokens[3].body, 'btest', 'second token' );
      t.equal( tokens[4].body, 'c', 'third token' );
      t.equal( tokens[5].body, 'abacus', 'fourth token' );
      t.end();
    }));

    tokenizer.write( new Token( 'a' ) );
    tokenizer.write( new Token( 'b' ) );
    tokenizer.write( new Token( 'c' ) );
    tokenizer.write( new Token( 'abacus' ) );
    tokenizer.end();
  });

  test('specific position', function(t) {

    var map = {
      'a': 'atest'
    };

    var tokenizer = synonyms({ map: map, position: 999 });
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'a', 'first token' );
      t.equal( tokens[1].body, 'atest', 'second token' );
      t.equal( tokens[2].body, 'a', 'third token' );
      t.end();
    }));

    var token1 = new Token( 'a' );
    var token2 = new Token( 'a' );
    token2.position = 999;
    var token3 = new Token( 'a' );

    tokenizer.write( token1 );
    tokenizer.write( token2 );
    tokenizer.write( token3 );
    tokenizer.end();
  });
};

module.exports.addresses = function(test, util) {
  test('address suffix expansion', function(t) {

    var map = {
      'st\x03': 'street\x03',
      'rd\x03': 'road\x03',
      'ave\x03': 'avenue\x03'
    };

    var tokenizer = synonyms({ map: map });
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'street\x03', 'first token' );
      t.equal( tokens[1].body, 'road\x03', 'second token' );
      t.equal( tokens[2].body, 'avenue\x03', 'third token' );
      t.end();
    }));

    tokenizer.write( new Token( 'st\x03' ) );
    tokenizer.write( new Token( 'rd\x03' ) );
    tokenizer.write( new Token( 'ave\x03' ) );
    tokenizer.end();
  });
};
