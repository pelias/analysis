
var singular = require('../../tokenizer/singular');

module.exports.interface = function(test, util) {
  test('interface', function(t) {
    t.equal(typeof singular, 'function', 'singular is a function');
    t.end();
  });
};

module.exports.singular = function(test, util) {
  test('identical singular and plural', function(t) {
    t.deepEqual(
      [ 'bison', 'buffalo', 'deer', 'duck', 'fish', 'moose', 'pike', 'plankton', 'salmon', 'sheep', 'squid', 'swine', 'trout' ].reduce( singular, [] ),
      [ 'bison', 'buffalo', 'deer', 'duck', 'fish', 'moose', 'pike', 'plankton', 'salmon', 'sheep', 'squid', 'swine', 'trout' ]
    );
    t.end();
  });

  // @todo: these are techinally not quite correct but will do for autocomplete
  test('sibilant sound', function(t) {
    t.deepEqual(
      [ 'kisses', 'phases', 'dishes', 'massages', 'witches', 'judges' ].reduce( singular, [] ),
      [ 'kiss',   'phase',  'dish',   'massage',  'witch',   'judge' ]
    );
    t.end();
  });

  test('voiceless consonant', function(t) {
    t.deepEqual(
      [ 'laps', 'cats', 'clocks', 'cuffs', 'deaths' ].reduce( singular, [] ),
      [ 'lap' , 'cat' , 'clock' , 'cuff' , 'death'  ]
    );
    t.end();
  });

  test('regular plural', function(t) {
    t.deepEqual(
      [ 'boys', 'girls', 'chairs' ].reduce( singular, [] ),
      [ 'boy' , 'girl' , 'chair'  ]
    );
    t.end();
  });

  test('nouns ending in -o', function(t) {
    t.deepEqual(
      [ 'heroes', 'potatoes', 'volcanoes', 'volcanos' ].reduce( singular, [] ),
      [ 'hero'  , 'potato'  , 'volcano'  , 'volcano'  ]
    );
    t.end();
  });

  test('nouns ending in -o (Italian loanwords)', function(t) {
    t.deepEqual(
      [ 'cantos', 'heteros', 'photos', 'zeros', 'pianos', 'porticos', 'pros', 'quartos', 'kimonos' ].reduce( singular, [] ),
      [ 'canto' , 'hetero' , 'photo' , 'zero' , 'piano' , 'portico' , 'pro' , 'quarto' , 'kimono'   ]
    );
    t.end();
  });

  test('nouns ending in -y', function(t) {
    t.deepEqual(
      [ 'cherries', 'ladies', 'skies' ].reduce( singular, [] ),
      [ 'cherry'  , 'lady'  , 'sky'   ]
    );
    t.end();
  });

  test('nouns ending in -quy', function(t) {
    t.deepEqual(
      [ 'soliloquies' ].reduce( singular, [] ),
      [ 'soliloquy' ]
    );
    t.end();
  });

  test('voiceless fricatives', function(t) {
    t.deepEqual(
      [ 'baths', 'mouths', 'calves', /*'leaves',*/ 'knives', 'lives', 'houses', 'moths', 'proofs' ].reduce( singular, [] ),
      [ 'bath' , 'mouth' , 'calf'  , /*'leaf'  ,*/ 'knife' , 'life' , 'house' , 'moth' , 'proof'  ]
    );
    t.end();
  });

  test('nouns ending in -f', function(t) {
    t.deepEqual(
      [ 'dwarves', /*'hooves',*/ 'elves', /*'staves',*/ 'turves' ].reduce( singular, [] ),
      [ 'dwarf',   /*'hoof',*/   'elf',   /*'staff',*/  'turf' ]
    );
    t.end();
  });

  test('tokens consisting only of plural suffixes', function(t) {
    t.deepEqual(
      [ 's', 'es', 'ys', 'ies', 'ths' ].reduce( singular, [] ),
      [ 's', 'es', 'ys', 'ies', 'ths' ]
    );
    t.end();
  });
};
