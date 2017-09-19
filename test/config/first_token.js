
var prefix = require('../../config/first_token');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof prefix, 'object', 'prefix is a object');
    t.equal(typeof prefix.en, 'object', 'country code en exists');
    t.end();
  });
};

module.exports.prefix_en = function(test, util) {
  test('prefix en', function(t) {

    t.equal( Object.keys(prefix.en).length, 1 );
    t.equal( prefix.en['st'], 'saint' );

    t.end();
  });
};
