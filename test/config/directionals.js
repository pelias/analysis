
var directionals = require('../../config/directionals');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof directionals, 'object', 'directionals is a object');
    t.equal(typeof directionals.en, 'object', 'country code en exists');
    t.end();
  });
};

module.exports.directionals_en = function(test, util) {
  test('directionals en', function(t) {

    t.equal( Object.keys(directionals.en).length, 8 );
    t.equal( directionals.en['w'], 'west' );
    t.equal( directionals.en['ne'], 'northeast' );

    t.end();
  });
};
