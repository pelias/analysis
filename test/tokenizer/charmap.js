var Token = require('../../lib/Token');
var charmap = require('../../tokenizer/charmap');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof charmap, 'function', 'factory is a function');
    t.equal(charmap.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = charmap( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.charmap = function(test, util) {
  test('test charmap', function(t) {

    var map = {
      '$': '',
      '.': '',
      '@': '',
      '#': ''
    };

    var tokenizer = charmap({ map: map });
    tokenizer.pipe( util.collect( function( tokens ){

      // characters have been replaced
      t.equal( tokens[0].body, 'apple', 'first token' );
      t.equal( tokens[1].body, 'insertcoffee foo ', 'second token' );

      t.end();
    }));

    tokenizer.write( new Token( 'ap$ple.' ) );
    tokenizer.write( new Token( '@insertcoffee #foo ' ) );
    tokenizer.end();
  });
  test('do not emit empty tokens', function(t) {

    var map = {
      '$': '',
      '.': '',
    };

    var tokenizer = charmap({ map: map });
    tokenizer.pipe( util.collect( function( tokens ){

      // characters have all been removed
      t.equal( tokens.length, 0, 'no tokens produced' );

      t.end();
    }));

    tokenizer.write( new Token( '$.$..' ) );
    tokenizer.end();
  });
};
