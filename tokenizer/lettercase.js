
/**
  lettercase - transform the case of tokens

  context:
  - func [function] - the function used to transform the tokens (defaults to 'lowercase')
**/

const method = {
  'lower': (string) => { return string.toLowerCase(); },
  'upper': (string) => { return string.toUpperCase(); },
  'ucfirst': (string) => { return string.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()); },
};

function lettercase( res, word ){
  var func = ( 'function' === typeof this.func ) ? this.func : method.lower;
  res.push( func( word ) );
  return res;
}

module.exports = lettercase;
module.exports.method = method;
