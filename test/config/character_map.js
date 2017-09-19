
var charmap = require('../../config/character_map');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof charmap, 'object', 'charmap is a object');
    t.end();
  });
};

module.exports.charmap = function(test, util) {
  test('charmap', function(t) {

    t.equal( Object.keys(charmap).length, 57 );
    t.equal( charmap['ß'], 'ss' );
    t.equal( charmap['&'], 'and' );
    t.equal( charmap['*'], '' );

    t.end();
  });
};
