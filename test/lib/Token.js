var Token = require('../../lib/Token');

module.exports.interface = function(test, common) {
  test('valid interface', function(t) {
    t.equal(typeof Token, 'function', 'Token is a function');
    t.end();
  });
  test('valid class', function(t) {
    var token = new Token('test');
    t.equal(typeof Token.prototype.constructor, 'function', 'Token is a class');
    t.equal(typeof token, 'object', 'Token is a class');
    t.end();
  });
  test('valid class constants', function(t) {
    t.equal(Token.anchor, '\x03', 'anchor character set');
    t.end();
  });
};

module.exports.constructor = function(test, common) {
  test('valid constructor', function(t) {
    var token = new Token('test');
    t.equal(token.body, 'test', 'instance body');
    t.equal(token.position, 0, 'instance position');
    t.equal(token.count, 0, 'instance count');
    t.equal(token.isComplete, false, 'instance isComplete');
    t.end();
  });
};

module.exports.isInteger = function(test, common) {
  test('isInteger: true', function(t) {
    t.true(new Token('0').isInteger(), 'numeric: true');
    t.true(new Token('1').isInteger(), 'numeric: true');
    t.true(new Token('11').isInteger(), 'numeric: true');
    t.true(new Token('123').isInteger(), 'numeric: true');
    t.end();
  });
  test('isInteger: false', function(t) {
    t.false(new Token('a').isInteger(), 'numeric: false');
    t.false(new Token('one').isInteger(), 'numeric: false');
    t.false(new Token('').isInteger(), 'numeric: false');
    t.false(new Token('1.1').isInteger(), 'numeric: false');
    t.end();
  });
};

module.exports.isSingle = function(test, common) {
  test('isSingle: true', function(t) {
    t.true(new Token('0').isSingle(), 'single: true');
    t.true(new Token('1').isSingle(), 'single: true');
    t.true(new Token('A').isSingle(), 'single: true');
    t.true(new Token('z').isSingle(), 'single: true');
    t.end();
  });
  test('isSingle: false', function(t) {
    t.false(new Token('aa').isSingle(), 'single: false');
    t.false(new Token('BBB').isSingle(), 'single: false');
    t.false(new Token('').isSingle(), 'single: false');
    t.false(new Token('1.').isSingle(), 'single: false');
    t.end();
  });
};

module.exports.clone = function(test, common) {
  test('clone', function(t) {

    var token1 = new Token('test');
    token1.position = 1;
    token1.count = 1;
    token1.isComplete = true;

    var token2 = token1.clone();

    t.false(token1 === token2, 'different reference');
    t.equal(token1.body, token2.body, 'clone: body');
    t.equal(token1.position, token2.position, 'clone: position');
    t.equal(token1.count, token2.count, 'clone: count');
    t.equal(token1.isComplete, token2.isComplete, 'clone: isComplete');

    token1.position = 3;
    t.equal(token1.position, 3, 'copy by value');
    t.equal(token2.position, 1, 'copy by value');
    t.end();
  });
};
