var Token = require('../../lib/Token');
var anchors = require('../../tokenizer/anchors');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof anchors, 'function', 'factory is a function');
    t.equal(anchors.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = anchors( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.anchors = function(test, util) {
  test('anchor completed tokens', function(t) {

    var tokenizer = anchors();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'hello\x03', 'first token' );
      t.equal( tokens[1].body, 'world', 'second token' );
      t.end();
    }));

    var token1 = new Token( 'hello' );
    token1.isComplete = true;

    var token2 = new Token( 'world' );
    token2.isComplete = false;

    tokenizer.write( token1 );
    tokenizer.write( token2 );
    tokenizer.end();
  });

  test('anchor numbers', function(t) {

    var tokenizer = anchors();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, '2500\x03', 'first token' );
      t.equal( tokens[1].body, '100', 'second token' );
      t.end();
    }));

    var token1 = new Token( '2500' );
    token1.isComplete = true;

    var token2 = new Token( '100' );
    token2.isComplete = false;

    tokenizer.write( token1 );
    tokenizer.write( token2 );
    tokenizer.end();
  });
};
