
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

// substitution of eszett is not working as expected
// see: https://github.com/tyxla/remove-accents/issues/12
// module.exports.eszett = function(test, util) {
//   test('test eszett', function(t) {
//     t.deepEqual(
//       [ 'straße' ].reduce( diacritic, [] ),
//       [ 'strasse' ]
//     );
//     t.end();
//   });
// };
