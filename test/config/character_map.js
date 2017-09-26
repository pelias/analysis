
var charmap = require('../../config/character_map');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof charmap, 'object', 'charmap is a object');
    t.end();
  });
};

module.exports.charmap = function(test, util) {
  test('charmap', function(t) {

    t.equal( Object.keys(charmap).length, 62 );
    t.equal( charmap['ß'], 'ss' );
    t.equal( charmap['&'], 'and' );
    t.equal( charmap['*'], '' );

    t.end();
  });
};

module.exports.umlaut = function(test, util) {
  test('umlaut', function(t) {

    t.equal( charmap['Ä'], 'Ae' );
    t.equal( charmap['ä'], 'ae' );
    t.equal( charmap['Ö'], 'Oe' );
    t.equal( charmap['ö'], 'oe' );
    t.equal( charmap['Ü'], 'Ue' );
    t.equal( charmap['ü'], 'ue' );

    t.end();
  });
};
