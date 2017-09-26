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
    t.equal( analyzer('10 main street'), '10 Main Street' );
    t.equal( analyzer('10 main St.'), '10 Main Street' );
    t.equal( analyzer('10 main st.'), '10 Main Street' );
    t.equal( analyzer('10 main str'), '10 Main Street' );
    t.equal( analyzer('10 main st'), '10 Main Street' );
    t.end();
  });

  test('road', function(t) {
    t.equal( analyzer('10 main road'), '10 Main Road' );
    t.equal( analyzer('10 main Rd.'), '10 Main Road' );
    t.equal( analyzer('10 main rd.'), '10 Main Road' );
    t.equal( analyzer('10 main rd'), '10 Main Road' );
    t.end();
  });

  test('avenue', function(t) {
    t.equal( analyzer('10 main avenue'), '10 Main Avenue' );
    t.equal( analyzer('10 main Ave.'), '10 Main Avenue' );
    t.equal( analyzer('10 main ave.'), '10 Main Avenue' );
    t.equal( analyzer('10 main ave'), '10 Main Avenue' );
    t.end();
  });

  test('misc', function(t) {
    t.equal( analyzer('YELLOWSTONE BLVD'), 'Yellowstone Boulevarde' );
    t.equal( analyzer('YESHIVA LN'), 'Yeshiva Lane' );
    t.equal( analyzer('WYGANT PL'), 'Wygant Place' );
    t.equal( analyzer('THROGS NECK EXPY SR'), 'Throgs Neck Expressway State Route' );
    t.equal( analyzer('W  FARMS SQ PLAZA'), 'West Farms Square Plaza' );
    t.equal( analyzer('W  262 ST'), 'West 262 Street' );
    t.equal( analyzer('W 26TH ST'), 'West 26 Street' );
    t.end();
  });

  test('directionals', function(t) {
    t.equal( analyzer('W  KINGSBRIDGE RD'), 'West Kingsbridge Road' );
    t.equal( analyzer('W  MOSHOLU PKWY  S'), 'West Mosholu Parkway South' );
    t.equal( analyzer('WILLIAMSBURG ST   E'), 'Williamsburg Street East' );
    t.equal( analyzer('W  MOSHOLU PKWY  N'), 'West Mosholu Parkway North' );
    t.equal( analyzer('W  MOSHOLU PKWY  S'), 'West Mosholu Parkway South' );
    t.end();
  });
};

module.exports.german_expansions = function(test, util) {

  var analyzer = street({
    locale: 'de'
  });

  test('strasse compound word', function(t) {
    t.equal( analyzer('10 hauptstrasse'), '10 Hauptstrasse' );
    t.equal( analyzer('10 hauptstraße'), '10 Hauptstrasse' );
    t.equal( analyzer('10 hauptstr.'), '10 Hauptstrasse' );
    t.equal( analyzer('10 hauptstr'), '10 Hauptstrasse' );
    t.end();
  });

  test('bruecke', function(t) {
    t.equal( analyzer('10 haupt bruecke'), '10 Haupt Bruecke' );
    t.equal( analyzer('10 haupt brücke'), '10 Haupt Bruecke' );
    t.equal( analyzer('10 haupt br.'), '10 Haupt Bruecke' );
    t.equal( analyzer('10 haupt br'), '10 Haupt Bruecke' );
    t.end();
  });

  test('umlaut', function(t) {
    t.equal( analyzer('zwiestädter straße'), 'Zwiestaedter Strasse' );
    t.equal( analyzer('zweibrücker straße'), 'Zweibruecker Strasse' );
    t.equal( analyzer('zur börse'), 'Zur Boerse' );
    t.end();
  });

  test('hyphen', function(t) {
    t.equal( analyzer('max-beer-straße'), 'Max-Beer-Strasse' );
    t.end();
  });
};
