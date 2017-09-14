
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

  test('simple', function(t) {
    t.equal( analyzer('main street'), 'main street' );
    t.equal( analyzer('main St.'), 'main street' );
    t.equal( analyzer('main st.'), 'main street' );
    t.equal( analyzer('main str'), 'main street' );
    t.equal( analyzer('main st'), 'main street' );
    t.end();
  });
};

module.exports.german_expansions = function(test, util) {

  var analyzer = street({
    locale: 'de'
  });

  test('simple', function(t) {
    t.equal( analyzer('main street'), 'main street' );
    t.equal( analyzer('main straße'), 'main strasse' );
    t.equal( analyzer('main Str.'), 'main strasse' );
    t.equal( analyzer('main Str'), 'main strasse' );
    t.equal( analyzer('main str.'), 'main strasse' );
    t.equal( analyzer('main str'), 'main strasse' );
    t.end();
  });
};
