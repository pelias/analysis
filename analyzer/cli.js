
var readline = require('readline');

var locale = process.argv[2],
	analyzerName = process.argv.slice(3);

try {
	var ctx = { locale: locale }
	var analyzer = require('./example/' + analyzerName).call(null, ctx);

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false
	});

	rl.on('line', function(line){
	  console.log( analyzer( line ) );
	})
}
catch( e ){
	console.error( 'invalid analyzer', analyzerName );
}
