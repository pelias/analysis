var fs = require('fs'),
    path = require('path'),
    tape = require('tape'),
    readline = require('readline');

var tests = [{
  analyzer: require('../analyzer/street')({ locale: 'de' }),
  file: './functional/street_de_berlin.test'
},{
  analyzer: require('../analyzer/street')({ locale: 'en' }),
  file: './functional/street_en_nyc.test'
}];

// test runner
tests.map( function( config ){
  var rl = readline.createInterface({
    input: fs.createReadStream( path.join( __dirname, config.file ) ),
    terminal: false
  });

  tape( path.normalize( config.file ), function( t ) {
    rl.on('line', function( line ){
      var cols = line.split('|').map( c => c.trim() );
      t.equals( config.analyzer( cols[0] ), cols[1], cols[0] );
    });
    t.end();
  });
});
