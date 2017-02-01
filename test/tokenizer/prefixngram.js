var Token = require('../../lib/Token');
var prefixngram = require('../../tokenizer/prefixngram');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof prefixngram, 'function', 'factory is a function');
    t.equal(prefixngram.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = prefixngram( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.prefixngram = function(test, util) {
  test('test prefixngram', function(t) {

    var tokenizer = prefixngram();
    tokenizer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 10, 'three tokens produced' );

      // first token
      t.equal( tokens[0].body, 'h', 'first token' );
      t.equal( tokens[1].body, 'he', 'second token' );
      t.equal( tokens[2].body, 'hel', 'third token' );
      t.equal( tokens[3].body, 'hell', 'fourth token' );
      t.equal( tokens[4].body, 'hello', 'fifth token' );
      t.equal( tokens[5].body, 'w', 'sixth token' );
      t.equal( tokens[6].body, 'wo', 'seventh token' );
      t.equal( tokens[7].body, 'wor', 'eighth token' );
      t.equal( tokens[8].body, 'worl', 'ninth token' );
      t.equal( tokens[9].body, 'world', 'tenth token' );

      t.end();
    }));

    tokenizer.write( new Token( 'hello' ) );
    tokenizer.write( new Token( 'world' ) );
    tokenizer.end();
  });
};
