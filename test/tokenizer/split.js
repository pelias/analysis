var Token = require('../../lib/Token');
var split = require('../../tokenizer/split');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof split, 'function', 'factory is a function');
    t.equal(split.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = split( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.split = function(test, util) {
  test('test split', function(t) {

    var tokenizer = split();
    tokenizer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 2, 'two tokens produced' );

      // first token
      t.equal( tokens[0].body, 'Hello', 'first token' );
      t.equal( tokens[0].position, 1, 'first token' );
      t.equal( tokens[0].count, 2, 'first token' );
      t.equal( tokens[0].isComplete, true, 'first token' );

      // second token
      t.equal( tokens[1].body, 'World!', 'second token' );
      t.equal( tokens[1].position, 2, 'second token' );
      t.equal( tokens[1].count, 2, 'second token' );
      t.equal( tokens[1].isComplete, false, 'second token' );

      t.end();
    }));

    tokenizer.write( new Token( 'Hello World!' ) );
    tokenizer.end();
  });

  test('markAllComplete', function(t) {

    var tokenizer = split({ markAllComplete: true });
    tokenizer.pipe( util.collect( function( tokens ){

      // marked as complete (would usually be false, now true)
      t.equal( tokens[1].isComplete, true, 'second token' );
      t.end();

    }));

    tokenizer.write( new Token( 'Hello World!' ) );
    tokenizer.end();
  });
};
