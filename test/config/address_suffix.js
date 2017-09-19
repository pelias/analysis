
var suffix = require('../../config/address_suffix');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof suffix, 'object', 'suffix is a object');
    t.equal(typeof suffix.en, 'object', 'country code en exists');
    t.end();
  });
};

module.exports.suffix_en = function(test, util) {
  test('suffix en', function(t) {

    t.equal( Object.keys(suffix.en).length, 120 );
    t.equal( suffix.en['aly'], 'alley' );
    t.equal( suffix.en['st'], 'street' );
    t.equal( suffix.en['mnt'], 'mountain' );

    t.end();
  });
};
