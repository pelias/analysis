var Token = require('../../lib/Token');
var unique = require('../../analyzer/unique');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof unique, 'function', 'factory is a function');
    t.equal(unique.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = unique( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.unique = function(test, util) {
  test('test unique', function(t) {

    var analyzer = unique();
    analyzer.pipe( util.collect( function( tokens ){

      // total token count
      t.equal( tokens.length, 2, 'two tokens produced' );

      // duplicate tokens have been removed
      t.equal( tokens[0].body, 'apple', 'first token' );
      t.equal( tokens[1].body, 'pear', 'second token' );

      t.end();
    }));

    analyzer.write( new Token( 'apple' ) );
    analyzer.write( new Token( 'apple' ) );
    analyzer.write( new Token( 'pear' ) );
    analyzer.write( new Token( 'apple' ) );
    analyzer.write( new Token( 'pear' ) );
    analyzer.end();
  });
};
