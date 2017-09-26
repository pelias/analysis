
var unique = require('../../tokenizer/unique');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof unique, 'function', 'unique is a function');
    t.end();
  });
};

module.exports.unique = function(test, util) {
  test('test unique', function(t) {
    t.deepEqual(
      [ 'apple', 'apple', 'pear', 'apple', 'pear' ].reduce( unique, [] ),
      [ 'apple', 'pear' ]
    );
    t.end();
  });
};
