
var disjoin = require('../../tokenizer/disjoin'),
    dictionary = require('../../config/dictionary');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof disjoin, 'function', 'disjoin is a function');
    t.end();
  });
};

module.exports.disjoin = function(test, util) {
  test('test disjoin - split:false', function(t) {

    var ctx = {
      map: dictionary( 'de', 'concatenated_suffixes_separable.txt', true )
    };

    var tokenizer = disjoin.bind(ctx);

    t.deepEqual(
      [ 'hauptstraße' ].reduce( tokenizer, [] ),
      [ 'hauptstrasse' ]
    );

    t.deepEqual(
      [ 'hauptstr' ].reduce( tokenizer, [] ),
      [ 'hauptstrasse' ]
    );

    t.deepEqual(
      [ 'hauptstr.' ].reduce( tokenizer, [] ),
      [ 'hauptstrasse' ]
    );

    t.deepEqual(
      [ 'straßenbräu' ].reduce( tokenizer, [] ),
      [ 'straßenbräu' ]
    );

    t.deepEqual(
      [ 'max-beer-straße' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'max-beer-str.' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'max-beer-str' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'zwergenweg' ].reduce( tokenizer, [] ),
      [ 'zwergenweg' ]
    );

    t.end();
  });

  test('test disjoin - split:true', function(t) {

    var ctx = {
      map: dictionary( 'de', 'concatenated_suffixes_separable.txt', true ),
      split: true
    };

    var tokenizer = disjoin.bind(ctx);

    t.deepEqual(
      [ 'hauptstraße' ].reduce( tokenizer, [] ),
      [ 'haupt', 'strasse' ]
    );

    t.deepEqual(
      [ 'hauptstr' ].reduce( tokenizer, [] ),
      [ 'haupt', 'strasse' ]
    );

    t.deepEqual(
      [ 'hauptstr.' ].reduce( tokenizer, [] ),
      [ 'haupt', 'strasse' ]
    );

    t.deepEqual(
      [ 'straßenbräu' ].reduce( tokenizer, [] ),
      [ 'straßenbräu' ]
    );

    t.deepEqual(
      [ 'max-beer-straße' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'max-beer-str.' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'max-beer-str' ].reduce( tokenizer, [] ),
      [ 'max-beer-strasse' ]
    );

    t.deepEqual(
      [ 'zwergenweg' ].reduce( tokenizer, [] ),
      [ 'zwergen', 'weg' ]
    );

    t.end();
  });
};
