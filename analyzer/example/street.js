
var requireDir = require('require-dir'),
    tokenizer = requireDir('../../tokenizer'),
    config = requireDir('../../config'),
    util = require('../../lib/util');

function analyzer( ctx ){
  var locale = ( ctx && 'string' === ctx.locale ) ? ctx.locale.toUpperCase() : 'ENG';

  return util.chain(
    tokenizer.diacritic,
    tokenizer.charmap.bind({ map: config.character_map }),
    tokenizer.lowercase,
    tokenizer.ordinals,
    tokenizer.singular,
    tokenizer.synonyms.bind({
      map: config.street_expansions[ locale ] || {},
      position: -1
    })
  );
}

module.exports = util.cache( analyzer );
