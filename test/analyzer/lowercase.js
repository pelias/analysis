var Token = require('../../lib/Token');
var lowercase = require('../../analyzer/lowercase');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof lowercase, 'function', 'factory is a function');
    t.equal(lowercase.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = lowercase( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.lowercase = function(test, util) {
  test('test lowercase', function(t) {

    var analyzer = lowercase();
    analyzer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 3, 'three tokens produced' );

      // first token
      t.equal( tokens[0].body, 'hello world', 'first token' );
      t.equal( tokens[1].body, 'hello', 'second token' );
      t.equal( tokens[2].body, 'world', 'third token' );

      t.end();
    }));

    analyzer.write( new Token( 'Hello WoRLd' ) );
    analyzer.write( new Token( 'Hello' ) );
    analyzer.write( new Token( 'WoRLd' ) );
    analyzer.end();
  });
};
