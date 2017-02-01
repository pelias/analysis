var Token = require('../../lib/Token');
var lowercase = require('../../tokenizer/lowercase');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof lowercase, 'function', 'factory is a function');
    t.equal(lowercase.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = lowercase( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.lowercase = function(test, util) {
  test('test lowercase', function(t) {

    var tokenizer = lowercase();
    tokenizer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 3, 'three tokens produced' );

      // first token
      t.equal( tokens[0].body, 'hello world', 'first token' );
      t.equal( tokens[1].body, 'hello', 'second token' );
      t.equal( tokens[2].body, 'world', 'third token' );

      t.end();
    }));

    tokenizer.write( new Token( 'Hello WoRLd' ) );
    tokenizer.write( new Token( 'Hello' ) );
    tokenizer.write( new Token( 'WoRLd' ) );
    tokenizer.end();
  });
};
