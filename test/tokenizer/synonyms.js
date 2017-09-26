
var synonyms = require('../../tokenizer/synonyms');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof synonyms, 'function', 'synonyms is a function');
    t.end();
  });
};

module.exports.synonyms = function(test, util) {
  test('default settings', function(t) {

    var ctx = { map: {
      'a': 'atest',
      'b': 'btest'
    }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'a', 'b', 'c', 'abacus' ].reduce( tokenizer, [] ),
      [ 'atest', 'btest', 'c', 'abacus' ]
    );

    t.end();
  });

  // test('keep original', function(t) {
  //
  //   var ctx = {
  //     keepOriginal: true,
  //     map: {
  //       'a': 'atest',
  //       'b': 'btest'
  //     }};
  //
  //   var tokenizer = synonyms.bind(ctx);
  //
  //   // tokens have been replaced
  //   t.deepEqual(
  //     [ 'a b c abacus' ].reduce( tokenizer, [] ),
  //     [ 'a atest b btest c abacus' ]
  //   );
  //
  //   t.end();
  // });

  test('specific position', function(t) {

    var ctx = {
      positions: [ 1 ],
      map: {
        'a': 'atest'
      }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'a', 'a', 'a' ].reduce( tokenizer, [] ),
      [ 'a', 'atest', 'a' ]
    );

    t.end();
  });

  test('first position', function(t) {

    var ctx = {
      positions: [ 0 ],
      map: {
        'a': 'atest'
      }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'a', 'a', 'a' ].reduce( tokenizer, [] ),
      [ 'atest', 'a', 'a' ]
    );

    t.end();
  });

  test('last position', function(t) {

    var ctx = {
      positions: [ -1 ],
      map: {
        'a': 'atest'
      }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'a', 'a', 'a' ].reduce( tokenizer, [] ),
      [ 'a', 'a', 'atest' ]
    );

    t.end();
  });

  test('multiple synonyms per token', function(t) {

    var ctx = {
      map: {
        'a': 'atest',
        'b': 'btest'
      }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'a', 'b', 'a', ].reduce( tokenizer, [] ),
      [ 'atest', 'btest', 'atest' ]
    );

    t.end();
  });
};

module.exports.addresses = function(test, util) {
  test('address suffix expansion', function(t) {

    var ctx = { map: {
      'st': 'street',
      'rd': 'road',
      'ave': 'avenue'
    }};

    var tokenizer = synonyms.bind(ctx);

    // tokens have been replaced
    t.deepEqual(
      [ 'st', 'rd', 'ave' ].reduce( tokenizer, [] ),
      [ 'street', 'road', 'avenue' ]
    );

    t.end();
  });
};
