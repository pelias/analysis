var Token = require('../../lib/Token');
var singular = require('../../analyzer/singular');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof singular, 'function', 'factory is a function');
    t.equal(singular.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('analyzer', function(t) {
    var analyzer = singular( null );
    t.equal(typeof analyzer, 'object', 'returns an analyzer stream');
    t.equal(analyzer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.singular = function(test, util) {
  test('identical singular and plural', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'bison' );
      t.equal( tokens[1].body, 'buffalo' );
      t.equal( tokens[2].body, 'deer' );
      t.equal( tokens[3].body, 'duck' );
      t.equal( tokens[4].body, 'fish' );
      t.equal( tokens[5].body, 'moose' );
      t.equal( tokens[6].body, 'pike' );
      t.equal( tokens[7].body, 'plankton' );
      t.equal( tokens[8].body, 'salmon' );
      t.equal( tokens[9].body, 'sheep' );
      t.equal( tokens[10].body, 'squid' );
      t.equal( tokens[11].body, 'swine' );
      t.equal( tokens[12].body, 'trout' );
      t.end();
    }));

    analyzer.write( new Token( 'bison' ) );
    analyzer.write( new Token( 'buffalo' ) );
    analyzer.write( new Token( 'deer' ) );
    analyzer.write( new Token( 'duck' ) );
    analyzer.write( new Token( 'fish' ) );
    analyzer.write( new Token( 'moose' ) );
    analyzer.write( new Token( 'pike' ) );
    analyzer.write( new Token( 'plankton' ) );
    analyzer.write( new Token( 'salmon' ) );
    analyzer.write( new Token( 'sheep' ) );
    analyzer.write( new Token( 'squid' ) );
    analyzer.write( new Token( 'swine' ) );
    analyzer.write( new Token( 'trout' ) );
    analyzer.end();
  });

  // @todo: these are techinally not quite correct but will do for autocomplete
  test('sibilant sound', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'kiss' );
      t.equal( tokens[1].body, 'phase' );
      t.equal( tokens[2].body, 'dish' );
      t.equal( tokens[3].body, 'massage' );
      t.equal( tokens[4].body, 'witch' );
      t.equal( tokens[5].body, 'judge' );
      t.end();
    }));

    analyzer.write( new Token( 'kisses' ) );
    analyzer.write( new Token( 'phases' ) );
    analyzer.write( new Token( 'dishes' ) );
    analyzer.write( new Token( 'massages' ) );
    analyzer.write( new Token( 'witches' ) );
    analyzer.write( new Token( 'judges' ) );
    analyzer.end();
  });

  test('voiceless consonant', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'lap' );
      t.equal( tokens[1].body, 'cat' );
      t.equal( tokens[2].body, 'clock' );
      t.equal( tokens[3].body, 'cuff' );
      t.equal( tokens[4].body, 'death' );
      t.end();
    }));

    analyzer.write( new Token( 'laps' ) );
    analyzer.write( new Token( 'cats' ) );
    analyzer.write( new Token( 'clocks' ) );
    analyzer.write( new Token( 'cuffs' ) );
    analyzer.write( new Token( 'deaths' ) );
    analyzer.end();
  });

  test('regular plural', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'boy' );
      t.equal( tokens[1].body, 'girl' );
      t.equal( tokens[2].body, 'chair' );
      t.end();
    }));

    analyzer.write( new Token( 'boys' ) );
    analyzer.write( new Token( 'girls' ) );
    analyzer.write( new Token( 'chairs' ) );
    analyzer.end();
  });

  test('nouns ending in -o', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'hero' );
      t.equal( tokens[1].body, 'potato' );
      t.equal( tokens[2].body, 'volcano' );
      t.equal( tokens[3].body, 'volcano' );
      t.end();
    }));

    analyzer.write( new Token( 'heroes' ) );
    analyzer.write( new Token( 'potatoes' ) );
    analyzer.write( new Token( 'volcanoes' ) );
    analyzer.write( new Token( 'volcanos' ) );
    analyzer.end();
  });

  test('nouns ending in -o (Italian loanwords)', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'canto' );
      t.equal( tokens[1].body, 'hetero' );
      t.equal( tokens[2].body, 'photo' );
      t.equal( tokens[3].body, 'zero' );
      t.equal( tokens[4].body, 'piano' );
      t.equal( tokens[5].body, 'portico' );
      t.equal( tokens[6].body, 'pro' );
      t.equal( tokens[7].body, 'quarto' );
      t.equal( tokens[8].body, 'kimono' );
      t.end();
    }));

    analyzer.write( new Token( 'cantos' ) );
    analyzer.write( new Token( 'heteros' ) );
    analyzer.write( new Token( 'photos' ) );
    analyzer.write( new Token( 'zeros' ) );
    analyzer.write( new Token( 'pianos' ) );
    analyzer.write( new Token( 'porticos' ) );
    analyzer.write( new Token( 'pros' ) );
    analyzer.write( new Token( 'quartos' ) );
    analyzer.write( new Token( 'kimonos' ) );
    analyzer.end();
  });

  test('nouns ending in -y', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'cherry' );
      t.equal( tokens[1].body, 'lady' );
      t.equal( tokens[2].body, 'sky' );
      t.end();
    }));

    analyzer.write( new Token( 'cherries' ) );
    analyzer.write( new Token( 'ladies' ) );
    analyzer.write( new Token( 'skies' ) );
    analyzer.end();
  });

  test('nouns ending in -guy', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'soliloquy' );
      t.end();
    }));

    analyzer.write( new Token( 'soliloquies' ) );
    analyzer.end();
  });

  test('voiceless fricatives', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'bath' );
      t.equal( tokens[1].body, 'mouth' );
      t.equal( tokens[2].body, 'calf' );
      // t.equal( tokens[3].body, 'leaf' ); // wrong
      t.equal( tokens[4].body, 'knife' );
      t.equal( tokens[5].body, 'life' );
      t.equal( tokens[6].body, 'house' );
      t.equal( tokens[7].body, 'moth' );
      t.equal( tokens[8].body, 'proof' );
      t.end();
    }));

    // "baths", "mouths", "calves", "leaves", "knives", "lives", "houses", "moths", "proofs"

    analyzer.write( new Token( 'baths' ) );
    analyzer.write( new Token( 'mouths' ) );
    analyzer.write( new Token( 'calves' ) );
    analyzer.write( new Token( 'leaves' ) );
    analyzer.write( new Token( 'knives' ) );
    analyzer.write( new Token( 'lives' ) );
    analyzer.write( new Token( 'houses' ) );
    analyzer.write( new Token( 'moths' ) );
    analyzer.write( new Token( 'proofs' ) );
    analyzer.end();
  });

  test('nouns ending in -f', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'dwarf' );
      // t.equal( tokens[1].body, 'hoof' ); // wrong
      t.equal( tokens[2].body, 'elf' );
      // t.equal( tokens[3].body, 'staff' ); // wrong
      t.equal( tokens[4].body, 'turf' );
      t.end();
    }));

    analyzer.write( new Token( 'dwarves' ) );
    analyzer.write( new Token( 'hooves' ) );
    analyzer.write( new Token( 'elves' ) );
    analyzer.write( new Token( 'staves' ) );
    analyzer.write( new Token( 'turves' ) );
    analyzer.end();
  });

  test('tokens consisting only of plural suffixes', function(t) {

    var analyzer = singular();
    analyzer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 's' );
      t.equal( tokens[1].body, 'es' );
      t.equal( tokens[2].body, 'ys' );
      t.equal( tokens[3].body, 'ies' );
      t.equal( tokens[4].body, 'ths' );
      t.end();
    }));

    analyzer.write( new Token( 's' ) );
    analyzer.write( new Token( 'es' ) );
    analyzer.write( new Token( 'ys' ) );
    analyzer.write( new Token( 'ies' ) );
    analyzer.write( new Token( 'ths' ) );
    analyzer.end();
  });
};
