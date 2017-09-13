
var prefixngram = require('../../tokenizer/prefixngram');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof prefixngram, 'function', 'prefixngram is a function');
    t.end();
  });
};

module.exports.prefixngram = function(test, util) {
  test('test prefixngram', function(t) {
    t.deepEqual(
      [ 'hello', 'world' ].reduce( prefixngram, [] ),
      [ 'h', 'he', 'hel', 'hell', 'hello', 'w', 'wo', 'wor', 'worl', 'world' ]
    );
    t.end();
  });
};
