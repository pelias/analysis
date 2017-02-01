var Token = require('../../lib/Token');
var unique = require('../../tokenizer/unique');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof unique, 'function', 'factory is a function');
    t.equal(unique.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = unique( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.unique = function(test, util) {
  test('test unique', function(t) {

    var tokenizer = unique();
    tokenizer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 2, 'two tokens produced' );

      // duplicate tokens have been removed
      t.equal( tokens[0].body, 'apple', 'first token' );
      t.equal( tokens[1].body, 'pear', 'second token' );

      t.end();
    }));

    tokenizer.write( new Token( 'apple' ) );
    tokenizer.write( new Token( 'apple' ) );
    tokenizer.write( new Token( 'pear' ) );
    tokenizer.write( new Token( 'apple' ) );
    tokenizer.write( new Token( 'pear' ) );
    tokenizer.end();
  });
};
