
var dictionary = require('../../config/dictionary');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof dictionary, 'function', 'dictionary is a function');
    t.equal(dictionary.length, 3, 'accepts 3 arguments');
    t.end();
  });
};

module.exports.dictionary = function(test, util) {
  test('load dictionary', function(t) {

    var map = dictionary( 'en', 'street_types.txt' );

    // dictionary loaded from disk
    t.equal( map.str, 'street' );
    t.equal( map.st, 'street' );
    t.equal( map.street, undefined ); // self reference not included

    t.end();
  });

  test('load dictionary - include self references', function(t) {

    var map = dictionary( 'en', 'street_types.txt', true );

    // dictionary loaded from disk
    t.equal( map.str, 'street' );
    t.equal( map.st, 'street' );
    t.equal( map.street, 'street' ); // self reference included

    t.end();
  });

  test('load dictionary - invalid country code', function(t) {

    var map = dictionary( 'test', 'street_types.txt' );

    // empty map
    t.deepEqual( map, {} );
    t.end();
  });

  test('load dictionary - invalid file name', function(t) {

    var map = dictionary( 'en', 'not_exists.txt' );

    // empty map
    t.deepEqual( map, {} );
    t.end();
  });
};
