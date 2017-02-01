
function Token( body ){
  this.body = body;         // token body (the string)
  this.position = 0;        // token position
  this.count = 0;           // total tokens in original string
  this.isComplete = false;  // has the user finished typing the token (true) or
                            // only part of the token (false)
}
Token.anchor = '\x03';      // character used to indicate the start of a string

Token.prototype.isInteger = function(){
  return !!this.body.match(/^[0-9]+$/);
};

Token.prototype.isSingle = function(){
  return !!this.body.match(/^.{1}$/);
};

Token.prototype.clone = function(){
  var t = new Token( this.body );
  t.position = this.position;
  t.count = this.count;
  t.isComplete = this.isComplete;
  return t;
};

module.exports = Token;
