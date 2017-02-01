var Token = require('../../lib/Token');
var charmap = require('../../analyzer/charmap');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof charmap, 'function', 'factory is a function');
    t.equal(charmap.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = charmap( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
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

    var analyzer = charmap({ map: map });
    analyzer.pipe( util.collect( function( tokens ){

      // characters have been replaced
      t.equal( tokens[0].body, 'apple', 'first token' );
      t.equal( tokens[1].body, 'insertcoffee foo ', 'second token' );

      t.end();
    }));

    analyzer.write( new Token( 'ap$ple.' ) );
    analyzer.write( new Token( '@insertcoffee #foo ' ) );
    analyzer.end();
  });
  test('do not emit empty tokens', function(t) {

    var map = {
      '$': '',
      '.': '',
    };

    var analyzer = charmap({ map: map });
    analyzer.pipe( util.collect( function( tokens ){

      // characters have all been removed
      t.equal( tokens.length, 0, 'no tokens produced' );

      t.end();
    }));

    analyzer.write( new Token( '$.$..' ) );
    analyzer.end();
  });
};
