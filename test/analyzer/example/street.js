
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
    locale: 'eng'
  });

  test('simple', function(t) {
    t.equal( analyzer('main street'), 'main street' );
    t.equal( analyzer('main St.'), 'main street' );
    t.equal( analyzer('main st.'), 'main street' );
    t.equal( analyzer('main st'), 'main street' );
    t.end();
  });
};
