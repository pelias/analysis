var Token = require('../../lib/Token');
var diacritic = require('../../tokenizer/diacritic');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof diacritic, 'function', 'factory is a function');
    t.equal(diacritic.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = diacritic( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.diacritic = function(test, util) {
  test('test diacritic', function(t) {

    var tokenizer = diacritic();
    tokenizer.pipe( util.collect( function( tokens ){

      // accents have been removed
      t.equal( tokens[0].body, 'zuzo', 'first token' );
      t.equal( tokens[1].body, 'Cinematte', 'second token' );
      t.equal( tokens[2].body, 'Spindleruv Mlyn', 'third token' );

      t.end();
    }));

    tokenizer.write( new Token( 'žůžo' ) );
    tokenizer.write( new Token( 'Cinématte' ) );
    tokenizer.write( new Token( 'Špindlerův Mlýn' ) );
    tokenizer.end();
  });
};
