
var charmap = require('../../tokenizer/charmap');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof charmap, 'function', 'charmap is a function');
    t.end();
  });
};

module.exports.charmap = function(test, util) {
  test('test charmap', function(t) {

    var ctx = { map: {
      '$': '',
      '.': '',
      '@': '',
      '#': ''
    }};

    var tokenizer = charmap.bind(ctx);

    // characters have been replaced
    t.deepEqual(
      [ 'ap$ple.', '@insertcoffee #foo ' ].reduce( tokenizer, [] ),
      [ 'apple', 'insertcoffee foo ' ]
    );

    t.end();
  });

  test('do not emit empty tokens', function(t) {

    var ctx = { map: {
      '$': '',
      '.': ''
    }};

    var tokenizer = charmap.bind(ctx);

    // characters have all been removed
    t.deepEqual(
      [ '$.$..' ].reduce( tokenizer, [] ),
      [ ]
    );

    t.end();
  });
};
