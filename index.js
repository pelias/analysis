
var dir = require('require-dir'),
    options = { recurse: true };

module.exports = {
  analyzer:   dir('./analyzer',   options),
  config:     dir('./config',     options),
  lib:        dir('./lib',        options),
  tokenizer:  dir('./tokenizer',  options)
};
