
var requireDir = require('require-dir'),
    tokenizer = requireDir('../../tokenizer'),
    config = requireDir('../../config'),
    util = require('../../lib/util');

function analyzer( ctx ){

  ctx = ctx || {};

  return util.chain(
    tokenizer.unique.bind(ctx),
    tokenizer.diacritic.bind(ctx),
    tokenizer.charmap.bind( util.merge(ctx, { map: config.character_map } )),
    tokenizer.lowercase.bind(ctx),
    tokenizer.ordinals.bind(ctx),
    tokenizer.singular.bind(ctx),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.first_token, position: 1 } )),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.address_suffix } )),
    tokenizer.synonyms.bind( util.merge(ctx, { map: config.directionals } )),
    tokenizer.unique.bind(ctx)
  );
}

module.exports = analyzer;
//
// analyzers should:
// - be reusable (dont instantiate a new one each time)
// - have error handling
// - should be aware of local
// - be performant
//
// tokenizers should:
// - be reusable (dont instantiate a new one each time)
// - have error handling
// - be able to output 0, 1 or more results
// - should be aware of local
//
//
// inconvenient to return an array for string input
