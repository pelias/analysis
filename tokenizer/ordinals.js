
/**
  ordinals - remove ordinals (such as the 'st' from '21st')
**/

var replacement = "$2$4$5$6$7$9$10$12$14$15$16$17$18";
var regex = function() {
  var reg = "";
  reg += "((^|\\s)";                                             // start anchor (group $2)
  reg += "((1)st?|(2)nd?|(3)rd?|([4-9])th?)";                    // singles (groups $4$5$6$7)
  reg += "|";                                                    // or
  reg += "(0*([0-9]*)(1[0-9])th?)";                              // teens (groups $9$10), trim leading zeros
  reg += "|";                                                    // or
  reg += "(0*([0-9]*[02-9])((1)st?|(2)nd?|(3)rd?|([04-9])th?))"; // the rest (groups $12$14$15$16$17), trim leading zeros
  reg += "($|\\s))";                                             // end anchor (group $18)
  return new RegExp( reg, 'gi' );
}();

function ordinals( res, cur ){
  res.push( cur.replace( regex, replacement ) );
  return res;
}

module.exports = ordinals;
