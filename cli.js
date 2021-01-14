const readline = require('readline');
const tty = require('tty');

const locale = process.argv[2];
const analyzerName = process.argv.slice(3);

if (tty.isatty(process.stdin)) {
	console.error('no data piped to stdin');
	process.exit(1);
}

try {
	const ctx = { locale: locale };
	const analyzer = require('./analyzer/' + analyzerName).call(null, ctx);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});

	rl.on('line', line => console.log(analyzer(line)));
}
catch (e) {
	console.error('invalid analyzer', analyzerName);
}
