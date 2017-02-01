
var through = require('through2'),
    requireDir = require('require-dir'),
    tokenizer = requireDir('../tokenizer'),
    config = requireDir('../config'),
    util = require('../lib/util');

function analyzer( token, cb ){
  var tap = through.obj();

  tap.pipe( tokenizer.split({ markAllComplete: true }) )
     .pipe( tokenizer.unique() )
     .pipe( tokenizer.diacritic() )
     .pipe( tokenizer.charmap({ map: config.character_map }) )
     .pipe( tokenizer.lowercase() )
     .pipe( tokenizer.ordinals() )
     .pipe( tokenizer.singular() )
     .pipe( tokenizer.anchors() )
     .pipe( tokenizer.synonyms({ map: config.first_token, position: 1 }) )
     .pipe( tokenizer.synonyms({ map: config.address_suffix }) )
     .pipe( tokenizer.synonyms({ map: config.directionals }) )
     .pipe( tokenizer.unique() )
     .pipe( util.collect( cb ) );

  tap.write( token );
  tap.end();
}

module.exports = analyzer;
