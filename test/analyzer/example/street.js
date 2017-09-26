
var street = require('../../../analyzer/example/street');

module.exports.interface = function(test, util) {
  test('analyzer', function(t) {
    t.equal(typeof street, 'function', 'analyzer is a function');
    t.equal(street.length, 1, 'analyzer accepts context');
    t.end();
  });
};

module.exports.english_expansions = function(test, util) {

  var analyzer = street({
    locale: 'en'
  });

  test('street', function(t) {
    t.equal( analyzer('10 main street'), '10 main street' );
    t.equal( analyzer('10 main St.'), '10 main street' );
    t.equal( analyzer('10 main st.'), '10 main street' );
    t.equal( analyzer('10 main str'), '10 main street' );
    t.equal( analyzer('10 main st'), '10 main street' );
    t.end();
  });

  test('road', function(t) {
    t.equal( analyzer('10 main road'), '10 main road' );
    t.equal( analyzer('10 main Rd.'), '10 main road' );
    t.equal( analyzer('10 main rd.'), '10 main road' );
    t.equal( analyzer('10 main rd'), '10 main road' );
    t.end();
  });

  test('avenue', function(t) {
    t.equal( analyzer('10 main avenue'), '10 main avenue' );
    t.equal( analyzer('10 main Ave.'), '10 main avenue' );
    t.equal( analyzer('10 main ave.'), '10 main avenue' );
    t.equal( analyzer('10 main ave'), '10 main avenue' );
    t.end();
  });
};

module.exports.german_expansions = function(test, util) {

  var analyzer = street({
    locale: 'de'
  });

  test('strasse - compound word', function(t) {
    t.equal( analyzer('10 hauptstrasse'), '10 haupt strasse' );
    t.equal( analyzer('10 hauptstraße'), '10 haupt strasse' );
    t.equal( analyzer('10 hauptstr.'), '10 haupt strasse' );
    t.equal( analyzer('10 hauptstr'), '10 haupt strasse' );
    t.end();
  });

  test('bruecke', function(t) {
    t.equal( analyzer('10 haupt bruecke'), '10 haupt bruecke' );
    t.equal( analyzer('10 haupt brücke'), '10 haupt bruecke' );
    t.equal( analyzer('10 haupt br.'), '10 haupt bruecke' );
    t.equal( analyzer('10 haupt br'), '10 haupt bruecke' );
    t.end();
  });

  test('umlaut', function(t) {
    t.equal( analyzer('zwiestädter straße'), 'zwiestaedter strasse' );
    t.equal( analyzer('zweibrücker straße'), 'zweibruecker strasse' );
    t.equal( analyzer('zur börse'), 'zur boerse' );
    t.end();
  });

  test('hyphen', function(t) {
    t.equal( analyzer('max-beer-straße'), 'max-beer-strasse' );
    t.end();
  });
};
