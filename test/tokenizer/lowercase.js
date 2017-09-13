
var lowercase = require('../../tokenizer/lowercase');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof lowercase, 'function', 'lowercase is a function');
    t.end();
  });
};

module.exports.lowercase = function(test, util) {
  test('test lowercase', function(t) {
    t.deepEqual(
      [ 'Hello WoRLd', 'Hello', 'WoRLd' ].reduce( lowercase, [] ),
      [ 'hello world', 'hello', 'world' ]
    );
    t.end();
  });
};
