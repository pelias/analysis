
/**
  unique - remove duplicate tokens
**/

function unique( res, cur ){
  return ~res.indexOf( cur ) ? res : res.concat([cur]);
}

module.exports = unique;
