
var requireDir = require('require-dir'),
    tokenizer = requireDir('../../tokenizer'),
    config = requireDir('../../config'),
    util = require('../../lib/util');

function analyzer( ctx ){
  var locale = ( ctx && 'string' === typeof ctx.locale ) ? ctx.locale.toLowerCase() : 'en';

  return util.chain(
    tokenizer.diacritic.bind(ctx),
    tokenizer.lowercase.bind(ctx),
    tokenizer.disjoin.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'concatenated_suffixes_separable.txt', true )
    })),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map } )),
    tokenizer.ordinals.bind(ctx),
    tokenizer.singular.bind(ctx),
    tokenizer.synonyms.bind( util.merge(ctx, {
      map: config.dictionary( locale, 'street_types.txt' ),
      position: -1
    }))
  );
}

module.exports = util.cache( analyzer );
