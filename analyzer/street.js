
var requireDir = require('require-dir'),
    tokenizer = requireDir('../tokenizer'),
    config = requireDir('../config'),
    util = require('../lib/util');

function analyzer( ctx ){
  var locale = ( ctx && 'string' === typeof ctx.locale ) ? ctx.locale.toLowerCase() : 'en';

  return util.chain(
    tokenizer.lettercase.bind( util.merge(ctx, { func: tokenizer.lettercase.method.lower } )),
    tokenizer.disjoin.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'concatenated_suffixes_separable.txt', true )
    })),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map.punctuation } )),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map[ locale ] || {} } )),
    tokenizer.ordinals.bind(ctx),
    tokenizer.synonyms.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'street_types_overrides.txt' ),
      positions: [ -2, -1 ]
    })),
    tokenizer.synonyms.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'street_types.txt', null, 2 ),
      positions: [ -2, -1 ],
    })),
    tokenizer.synonyms.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'directionals.txt' ),
      positions: [ 0, -1 ]
    })),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.first_token[locale] || {}, positions: [ 0 ] } )),
    tokenizer.lettercase.bind( util.merge(ctx, { func: tokenizer.lettercase.method.ucfirst } ))
  );
}

module.exports = util.cache( analyzer );
