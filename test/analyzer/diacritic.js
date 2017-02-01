var Token = require('../../lib/Token');
var diacritic = require('../../analyzer/diacritic');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof diacritic, 'function', 'factory is a function');
    t.equal(diacritic.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = diacritic( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.diacritic = function(test, util) {
  test('test diacritic', function(t) {

    var analyzer = diacritic();
    analyzer.pipe( util.collect( function( tokens ){

      // accents have been removed
      t.equal( tokens[0].body, 'zuzo', 'first token' );
      t.equal( tokens[1].body, 'Cinematte', 'second token' );
      t.equal( tokens[2].body, 'Spindleruv Mlyn', 'third token' );

      t.end();
    }));

    analyzer.write( new Token( 'žůžo' ) );
    analyzer.write( new Token( 'Cinématte' ) );
    analyzer.write( new Token( 'Špindlerův Mlýn' ) );
    analyzer.end();
  });
};
