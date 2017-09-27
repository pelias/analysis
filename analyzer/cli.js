
var readline = require('readline'),
		tty = require('tty');

var locale = process.argv[2],
		analyzerName = process.argv.slice(3);

if( tty.isatty( process.stdin ) ){
  console.error('no data piped to stdin');
  process.exit(1);
}

try {
	var ctx = { locale: locale };
	var analyzer = require('./' + analyzerName).call(null, ctx);

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false
	});

	rl.on('line', function(line){
	  console.log( analyzer( line ) );
	});
}
catch( e ){
	console.error( 'invalid analyzer', analyzerName );
}
