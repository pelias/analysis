
var ordinals = require('../../tokenizer/ordinals');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof ordinals, 'function', 'ordinals is a function');
    t.end();
  });
};

module.exports.ordinals = function(test, util) {
  test('multiple in same string', function(t) {
    t.deepEqual(
      [ '1st 2nd 3rd 4th 5th' ].reduce( ordinals, [] ),
      [ '1 2 3 4 5' ]
    );
    t.end();
  });

  test('singles', function(t) {
    t.deepEqual(
      [ '1st', '2nd', '3rd', '4th', '5th' ].reduce( ordinals, [] ),
      [ '1', '2', '3', '4', '5' ]
    );
    t.end();
  });

  test('variable size', function(t) {
    t.deepEqual(
      [ '1st', '22nd', '333rd', '4444th', '2500th' ].reduce( ordinals, [] ),
      [ '1', '22', '333', '4444', '2500' ]
    );
    t.end();
  });

  test('teens', function(t) {
    t.deepEqual(
      [ '11th 12th 13th 14th 15th 16th 17th 18th 19th 20th' ].reduce( ordinals, [] ),
      [ '11 12 13 14 15 16 17 18 19 20' ]
    );
    t.end();
  });

  test('teens (hundreds)', function(t) {
    t.deepEqual(
      [ '111th 112th 113th 114th 115th 116th 117th 118th 119th 120th' ].reduce( ordinals, [] ),
      [ '111 112 113 114 115 116 117 118 119 120' ]
    );
    t.end();
  });

  test('teens (wrong suffix)', function(t) {
    t.deepEqual(
      [ '11st 12nd 13rd 111st 112nd 113rd' ].reduce( ordinals, [] ),
      [ '11st 12nd 13rd 111st 112nd 113rd' ]
    );
    t.end();
  });

  test('uppercase', function(t) {
    t.deepEqual(
      [ '1ST 22ND 333RD 4444TH' ].reduce( ordinals, [] ),
      [ '1 22 333 4444' ]
    );
    t.end();
  });

  test('autocomplete', function(t) {
    t.deepEqual(
      [ '26', '26t', '26th', '3', '3r', '3rd' ].reduce( ordinals, [] ),
      [ '26', '26', '26', '3', '3', '3' ]
    );
    t.end();
  });

  test('wrong suffix (do nothing)', function(t) {
    t.deepEqual(
      [ '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth' ].reduce( ordinals, [] ),
      [ '0th 26s 26st 31t 31th 21r 21rd 29n 29nd 20sth' ]
    );
    t.end();
  });

  test('trim leading zero', function(t) {
    t.deepEqual(
      [ '011th', '0000201st' ].reduce( ordinals, [] ),
      [ '11', '201' ]
    );
    t.end();
  });
};
