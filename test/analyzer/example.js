
var example = require('../../analyzer/example');

module.exports.interface = function(test, util) {
  test('analyzer', function(t) {
    t.equal(typeof example, 'function', 'analyzer is a function');
    t.equal(example.length, 1, 'analyzer accepts context');
    t.end();
  });
};

module.exports.example = function(test, util) {

  var analyzer = example();

  test('simple', function(t) {
    t.equal( analyzer('Hello World'), 'hello world' );
    t.end();
  });

  test('address #1', function(t) {
    t.equal( analyzer('30 west 26th street'), '30 west 26 street' );
    t.end();
  });

  test('address #1 abbreviated', function(t) {
    t.equal( analyzer('30 w 26 street'), '30 west 26 street' );
    t.end();
  });

  test('address #2', function(t) {
    t.equal( analyzer('1 2500th street'), '1 2500 street' );
    t.end();
  });

  test('single number', function(t) {
    t.equal( analyzer('250'), '250' );
    t.end();
  });

  test('single char for first token', function(t) {
    t.equal( analyzer('g street'), 'g street' );
    t.end();
  });

  test('single char for second token', function(t) {
    t.equal( analyzer('glasgow s'), 'glasgow south' );
    t.end();
  });

  test('single char street name', function(t) {
    t.equal( analyzer('k rd'), 'k road' );
    t.end();
  });

  test('synonym substitution', function(t) {
    t.equal( analyzer('mt lion'), 'mount lion' );
    t.end();
  });
};
