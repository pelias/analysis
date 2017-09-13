
var index = require('../../../analyzer/example/index')({});

module.exports.interface = function(test, util) {
  test('analyzer', function(t) {
    t.equal(typeof index, 'function', 'analyzer is a function');
    t.equal(index.length, 1, 'analyzer accepts context');
    t.end();
  });
};

module.exports.index = function(test, util) {
  test('simple', function(t) {
    t.deepEqual(
      index([ 'Hello World' ]),
            [ 'hello world' ]
    );
    t.end();
  });

  test('address #1', function(t) {
    t.deepEqual(
      index([ '30 west 26th street' ]),
            [ '30 west 26 street' ]
    );
    t.end();
  });

  test('address #1 abbreviated', function(t) {
    t.deepEqual(
      index([ '30 w 26 street' ]),
            [ '30 west 26 street' ]
    );
    t.end();
  });

  test('address #2', function(t) {
    t.deepEqual(
      index([ '1 2500th street' ]),
            [ '1 2500 street' ]
    );
    t.end();
  });

  test('single number', function(t) {
    t.deepEqual(
      index([ '250' ]),
            [ '250' ]
    );
    t.end();
  });

  test('single char for first token', function(t) {
    t.deepEqual(
      index([ 'g street' ]),
            [ 'g street' ]
    );
    t.end();
  });

  test('single char for second token', function(t) {
    t.deepEqual(
      index([ 'glasgow s' ]),
            [ 'glasgow south' ]
    );
    t.end();
  });

  test('single char street name', function(t) {
    t.deepEqual(
      index([ 'k rd' ]),
            [ 'k road' ]
    );
    t.end();
  });

  test('synonym substitution', function(t) {
    t.deepEqual(
      index([ 'mt lion' ]),
            [ 'mount lion' ]
    );
    t.end();
  });
};
