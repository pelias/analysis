
var diacritic = require('../../tokenizer/diacritic');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof diacritic, 'function', 'diacritic is a function');
    t.end();
  });
};

module.exports.diacritic = function(test, util) {
  test('test diacritic', function(t) {
    t.deepEqual(
      [ 'žůžo', 'Cinématte', 'Špindlerův Mlýn' ].reduce( diacritic, [] ),
      [ 'zuzo', 'Cinematte', 'Spindleruv Mlyn' ]
    );
    t.end();
  });
};
