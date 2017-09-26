
/**
  unique - remove duplicate tokens
**/

function unique( res, word ){
  return ~res.indexOf( word ) ? res : res.concat([ word ]);
}

module.exports = unique;
