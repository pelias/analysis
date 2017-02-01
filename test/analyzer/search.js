var Token = require('../../lib/Token');
var search = require('../../analyzer/search');

module.exports.interface = function(test, util) {
  test('analyzer', function(t) {
    t.equal(typeof search, 'function', 'analyzer is a function');
    t.equal(search.length, 2, 'analyzer accepts two args');
    t.end();
  });
};

module.exports.search = function(test, util) {
  test('simple', function(t) {
    search( new Token( 'Hello World' ), function( tokens ){

      t.equal( tokens[0].body, 'hello\x03' );
      t.equal( tokens[0].position, 1 );
      t.equal( tokens[0].count, 2 );
      t.equal( tokens[0].isComplete, true );

      t.equal( tokens[1].body, 'world' );
      t.equal( tokens[1].position, 2 );
      t.equal( tokens[1].count, 2 );
      t.equal( tokens[1].isComplete, false );

      t.end();
    });
  });

  test('address #1', function(t) {
    search( new Token( '30 west 26th street' ), function( tokens ){

      t.equal( tokens[0].body, '30\x03' );
      t.equal( tokens[1].body, 'west\x03' );
      t.equal( tokens[2].body, '26\x03' );
      t.equal( tokens[3].body, 'street' );

      t.end();
    });
  });

  test('address #1 abbreviated', function(t) {
    search( new Token( '30 w 26 street' ), function( tokens ){

      t.equal( tokens[0].body, '30\x03' );
      t.equal( tokens[1].body, 'west\x03' );
      t.equal( tokens[2].body, '26\x03' );
      t.equal( tokens[3].body, 'street' );

      t.end();
    });
  });

  test('address #2', function(t) {
    search( new Token( '1 2500th street' ), function( tokens ){

      t.equal( tokens[0].body, '1\x03' );
      t.equal( tokens[1].body, '2500\x03' );
      t.equal( tokens[2].body, 'street' );

      t.end();
    });
  });

  test('single number', function(t) {
    search( new Token( '250' ), function( tokens ){

      t.equal( tokens[0].body, '250' );

      t.end();
    });
  });

  test('single char for first token', function(t) {
    search( new Token( 'g street' ), function( tokens ){

      t.equal( tokens[0].body, 'g\x03' );
      t.equal( tokens[1].body, 'street' );

      t.end();
    });
  });

  test('single char for second token', function(t) {
    search( new Token( 'glasgow s' ), function( tokens ){

      t.equal( tokens[0].body, 'glasgow\x03' );
      t.equal( tokens[1].body, 's' );

      t.end();
    });
  });

  test('single char street name', function(t) {
    search( new Token( 'k rd' ), function( tokens ){

      t.equal( tokens[0].body, 'k\x03' );
      t.equal( tokens[1].body, 'road' );

      t.end();
    });
  });

  test('synonym substitution', function(t) {
    search( new Token( 'mt lion' ), function( tokens ){

      t.equal( tokens[0].body, 'mount\x03' );
      t.equal( tokens[1].body, 'lion' );

      t.end();
    });
  });
};
