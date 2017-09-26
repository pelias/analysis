
var lettercase = require('../../tokenizer/lettercase');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof lettercase, 'function', 'lettercase is a function');
    t.end();
  });
};

module.exports.lettercase = function(test, util) {
  test('test lettercase - default', function(t) {
    t.deepEqual(
      [ 'Hello WoRLd', 'Hello', 'WoRLd' ].reduce( lettercase, [] ),
      [ 'hello world', 'hello', 'world' ]
    );
    t.end();
  });
  test('test lettercase - lower', function(t) {
    var ctx = { func: lettercase.method.lower };
    t.deepEqual(
      [ 'Hello WoRLd', 'Hello', 'WoRLd' ].reduce( lettercase.bind(ctx), [] ),
      [ 'hello world', 'hello', 'world' ]
    );
    t.end();
  });
  test('test lettercase - lower', function(t) {
    var ctx = { func: lettercase.method.upper };
    t.deepEqual(
      [ 'Hello WoRLd', 'Hello', 'WoRLd' ].reduce( lettercase.bind(ctx), [] ),
      [ 'HELLO WORLD', 'HELLO', 'WORLD' ]
    );
    t.end();
  });
  test('test lettercase - ucfirst', function(t) {
    var ctx = { func: lettercase.method.ucfirst };
    t.deepEqual(
      [ 'Hello WoRLd', 'Hello', 'WoRLd' ].reduce( lettercase.bind(ctx), [] ),
      [ 'Hello World', 'Hello', 'World' ]
    );
    t.end();
  });
  test('test lettercase - ucfirst word boundaries', function(t) {
    var ctx = { func: lettercase.method.ucfirst };
    t.deepEqual(
      [ 'Hello WoRLd', 'hello-world', 'Zwiestädter Straße' ].reduce( lettercase.bind(ctx), [] ),
      [ 'Hello World', 'Hello-World', 'Zwiestädter Straße' ]
    );
    t.end();
  });
};
