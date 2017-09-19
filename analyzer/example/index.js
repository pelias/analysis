
var requireDir = require('require-dir'),
    tokenizer = requireDir('../../tokenizer'),
    config = requireDir('../../config'),
    util = require('../../lib/util');

function analyzer( ctx ){
  var locale = ( ctx && 'string' === typeof ctx.locale ) ? ctx.locale.toLowerCase() : 'en';

  return util.chain(
    tokenizer.unique.bind(ctx),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map } )),
    tokenizer.diacritic.bind(ctx),
    tokenizer.lowercase.bind(ctx),
    tokenizer.ordinals.bind(ctx),
    tokenizer.singular.bind(ctx),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.first_token[locale] || {}, position: 1 } )),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.address_suffix[locale] || {} } )),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.directionals[locale] || {} } )),
    tokenizer.unique.bind(ctx)
  );
}

module.exports = util.cache( analyzer );
