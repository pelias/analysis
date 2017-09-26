
var charmap = require('../../config/character_map');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof charmap, 'object', 'charmap is a object');
    t.end();
  });
};

module.exports.punctiont = function(test, util) {
  test('charmap', function(t) {
    t.equal( Object.keys(charmap.punctuation).length, 54 );
    t.equal( charmap.punctuation['*'], '' );
    t.end();
  });
};

module.exports.de = function(test, util) {
  test('de', function(t) {
    t.equal( charmap.en['&'], 'and' );
    t.end();
  });
};

module.exports.de = function(test, util) {
  test('de', function(t) {
    t.equal( charmap.de['Ä'], 'Ae' );
    t.equal( charmap.de['ä'], 'ae' );
    t.equal( charmap.de['Ö'], 'Oe' );
    t.equal( charmap.de['ö'], 'oe' );
    t.equal( charmap.de['Ü'], 'Ue' );
    t.equal( charmap.de['ü'], 'ue' );
    t.equal( charmap.de['ß'], 'ss' );
    t.equal( charmap.de['&'], 'und' );
    t.end();
  });
};
