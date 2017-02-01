var Token = require('../../lib/Token');
var singular = require('../../tokenizer/singular');

module.exports.interface = function(test, util) {
  test('factory', function(t) {
    t.equal(typeof singular, 'function', 'factory is a function');
    t.equal(singular.length, 1, 'factory accepts options arg');
    t.end();
  });
  test('tokenizer', function(t) {
    var tokenizer = singular( null );
    t.equal(typeof tokenizer, 'object', 'returns an tokenizer stream');
    t.equal(tokenizer.constructor.name, 'DestroyableTransform', 'valid stream');
    t.end();
  });
};

module.exports.singular = function(test, util) {
  test('identical singular and plural', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
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

    tokenizer.write( new Token( 'bison' ) );
    tokenizer.write( new Token( 'buffalo' ) );
    tokenizer.write( new Token( 'deer' ) );
    tokenizer.write( new Token( 'duck' ) );
    tokenizer.write( new Token( 'fish' ) );
    tokenizer.write( new Token( 'moose' ) );
    tokenizer.write( new Token( 'pike' ) );
    tokenizer.write( new Token( 'plankton' ) );
    tokenizer.write( new Token( 'salmon' ) );
    tokenizer.write( new Token( 'sheep' ) );
    tokenizer.write( new Token( 'squid' ) );
    tokenizer.write( new Token( 'swine' ) );
    tokenizer.write( new Token( 'trout' ) );
    tokenizer.end();
  });

  // @todo: these are techinally not quite correct but will do for autocomplete
  test('sibilant sound', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'kiss' );
      t.equal( tokens[1].body, 'phase' );
      t.equal( tokens[2].body, 'dish' );
      t.equal( tokens[3].body, 'massage' );
      t.equal( tokens[4].body, 'witch' );
      t.equal( tokens[5].body, 'judge' );
      t.end();
    }));

    tokenizer.write( new Token( 'kisses' ) );
    tokenizer.write( new Token( 'phases' ) );
    tokenizer.write( new Token( 'dishes' ) );
    tokenizer.write( new Token( 'massages' ) );
    tokenizer.write( new Token( 'witches' ) );
    tokenizer.write( new Token( 'judges' ) );
    tokenizer.end();
  });

  test('voiceless consonant', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'lap' );
      t.equal( tokens[1].body, 'cat' );
      t.equal( tokens[2].body, 'clock' );
      t.equal( tokens[3].body, 'cuff' );
      t.equal( tokens[4].body, 'death' );
      t.end();
    }));

    tokenizer.write( new Token( 'laps' ) );
    tokenizer.write( new Token( 'cats' ) );
    tokenizer.write( new Token( 'clocks' ) );
    tokenizer.write( new Token( 'cuffs' ) );
    tokenizer.write( new Token( 'deaths' ) );
    tokenizer.end();
  });

  test('regular plural', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'boy' );
      t.equal( tokens[1].body, 'girl' );
      t.equal( tokens[2].body, 'chair' );
      t.end();
    }));

    tokenizer.write( new Token( 'boys' ) );
    tokenizer.write( new Token( 'girls' ) );
    tokenizer.write( new Token( 'chairs' ) );
    tokenizer.end();
  });

  test('nouns ending in -o', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'hero' );
      t.equal( tokens[1].body, 'potato' );
      t.equal( tokens[2].body, 'volcano' );
      t.equal( tokens[3].body, 'volcano' );
      t.end();
    }));

    tokenizer.write( new Token( 'heroes' ) );
    tokenizer.write( new Token( 'potatoes' ) );
    tokenizer.write( new Token( 'volcanoes' ) );
    tokenizer.write( new Token( 'volcanos' ) );
    tokenizer.end();
  });

  test('nouns ending in -o (Italian loanwords)', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
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

    tokenizer.write( new Token( 'cantos' ) );
    tokenizer.write( new Token( 'heteros' ) );
    tokenizer.write( new Token( 'photos' ) );
    tokenizer.write( new Token( 'zeros' ) );
    tokenizer.write( new Token( 'pianos' ) );
    tokenizer.write( new Token( 'porticos' ) );
    tokenizer.write( new Token( 'pros' ) );
    tokenizer.write( new Token( 'quartos' ) );
    tokenizer.write( new Token( 'kimonos' ) );
    tokenizer.end();
  });

  test('nouns ending in -y', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'cherry' );
      t.equal( tokens[1].body, 'lady' );
      t.equal( tokens[2].body, 'sky' );
      t.end();
    }));

    tokenizer.write( new Token( 'cherries' ) );
    tokenizer.write( new Token( 'ladies' ) );
    tokenizer.write( new Token( 'skies' ) );
    tokenizer.end();
  });

  test('nouns ending in -guy', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'soliloquy' );
      t.end();
    }));

    tokenizer.write( new Token( 'soliloquies' ) );
    tokenizer.end();
  });

  test('voiceless fricatives', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
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

    tokenizer.write( new Token( 'baths' ) );
    tokenizer.write( new Token( 'mouths' ) );
    tokenizer.write( new Token( 'calves' ) );
    tokenizer.write( new Token( 'leaves' ) );
    tokenizer.write( new Token( 'knives' ) );
    tokenizer.write( new Token( 'lives' ) );
    tokenizer.write( new Token( 'houses' ) );
    tokenizer.write( new Token( 'moths' ) );
    tokenizer.write( new Token( 'proofs' ) );
    tokenizer.end();
  });

  test('nouns ending in -f', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 'dwarf' );
      // t.equal( tokens[1].body, 'hoof' ); // wrong
      t.equal( tokens[2].body, 'elf' );
      // t.equal( tokens[3].body, 'staff' ); // wrong
      t.equal( tokens[4].body, 'turf' );
      t.end();
    }));

    tokenizer.write( new Token( 'dwarves' ) );
    tokenizer.write( new Token( 'hooves' ) );
    tokenizer.write( new Token( 'elves' ) );
    tokenizer.write( new Token( 'staves' ) );
    tokenizer.write( new Token( 'turves' ) );
    tokenizer.end();
  });

  test('tokens consisting only of plural suffixes', function(t) {

    var tokenizer = singular();
    tokenizer.pipe( util.collect( function( tokens ){
      t.equal( tokens[0].body, 's' );
      t.equal( tokens[1].body, 'es' );
      t.equal( tokens[2].body, 'ys' );
      t.equal( tokens[3].body, 'ies' );
      t.equal( tokens[4].body, 'ths' );
      t.end();
    }));

    tokenizer.write( new Token( 's' ) );
    tokenizer.write( new Token( 'es' ) );
    tokenizer.write( new Token( 'ys' ) );
    tokenizer.write( new Token( 'ies' ) );
    tokenizer.write( new Token( 'ths' ) );
    tokenizer.end();
  });
};
