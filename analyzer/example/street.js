
var requireDir = require('require-dir'),
    tokenizer = requireDir('../../tokenizer'),
    config = requireDir('../../config'),
    util = require('../../lib/util');

function analyzer( ctx ){
  var locale = ( ctx && 'string' === ctx.locale ) ? ctx.locale.toUpperCase() : 'ENG';

  return util.chain(
    tokenizer.diacritic.bind(ctx),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map } )),
    tokenizer.lowercase.bind(ctx),
    tokenizer.ordinals.bind(ctx),
    tokenizer.singular.bind(ctx),
    tokenizer.synonyms.bind( util.merge(ctx, {
      map: config.street_expansions[ locale ] || {},
      position: -1
    }))
  );
}

module.exports = util.cache( analyzer );
