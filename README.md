
# Pelias analysis libraries

This repository contains prebuild textual analysis functions (analyzers) which are composed of smaller modules (tokenizers), each tokenizer performs actions such as transforming, filtering and enriching word tokens.

## Using Analyzers

Analyzers are available as functions and can be called like any regular function, the input is a single string and the output is also a single string:

```javascript
var street = require('./analyzer/street')
var analyzer = street()

analyzer('main str s')
// Main Street South
```

Analyzers also accept a 'context' object which is available throughout the analysis pipeline:

```javascript
var street = require('./analyzer/street')
var analyzer = street({ locale: 'de' })

analyzer('main str s')
// Main Strasse Sued
```

## Using Tokenizers

Tokenizers are intended to be used as part of an analyzer, but can also be used independently by calling `Array.reduce' on an array of tokens:

```javascript
var tokenizer = require('./tokenizer/diacritic')

[ 'žůžo', 'Cinématte' ].reduce( tokenizer, [] )
// [ 'zuzo', 'Cinematte' ]
```

## Writing Tokenizers

Tokenizers are functions with the interface expected by [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

In their simplest form a tokenizer is written as:

```javascript
// a delete-all tokenizer emits no words
var tokenizer = function( res, word, pos, arr ){

	// you must always return $res
	return res
}
```

For a tokenizer to have no effect on the token stream it must `res.push()` on to the response array each word it took in:

```javascript
// a no-op tokenizer emits words verbatim as they were taken in
var tokenizer = function( res, word, pos, arr ){

	// push the word on to the response array unmodified
	res.push( word )

	// you must always return $res
	return res
}
```

A tokenizer can modify choose what words are pushed downstream, and can also push more than one word to the response array:

```javascript
// a split tokenizer cuts a string on word boudaries, producing mutiple words
var tokenizer = function( res, word, pos, arr ){

	// split the input word on word boundaries
	var parts = word.split(/\b/g)

	// push each part downstream
	parts.forEach( function( part ){
		res.push( part )
	})

	// you must always return $res
	return res
}
```

Using these techniques, you can write tokenizers which delete, modify or create new words.

## Writing Tokenizers (advanced)

More advanced tokenizers require information about the context in which they were run, for example, knowing the locale of your input tokens might allow you to vary its functionality accordingly.

Context is provided to tokenizers by using `Function.bind` to bind the context to the tokenizer. This information will then be available inside the tokenizer using the `this` keyword:

```javascript
// an abbreviation expansion tokenizer converts the contracted form of a word to its equivalent expanded form
var tokenizer = function( res, word, pos, arr ){

	// detect the input locale (or default to english)
	var locale = this.locale || 'en'

	if( 'str.' === word ){
		switch( locale ){
			case 'de':
				// transform to German expansion
				res.push( 'strasse' )
				return res
			case 'en':
				// transform to English expansion
				res.push( 'street' )
				return res
		}
	}

	// push the word on to the response array unmodified
	res.push( word )

	// you must always return $res
	return res
}
```

```javascript
var english = tokenizer.bind({ locale: 'en' })
[ 'str.' ].reduce( english, [] )
// [ 'street' ]

var german = tokenizer.bind({ locale: 'de' })
[ 'str.' ].reduce( german, [] )
// [ 'strasse' ]
```


## Command line interface

there is an included CLI script which allows you to easily pipe in files for testing an analyzer:

```bash
# test a single input
$ node analyzer/cli.js en street <<< "n foo st w"

North Foo Street West

# test multiple inputs
$ echo -e "n foo st w\nw 16th st" | node analyzer/cli.js en street

North Foo Street West
West 16 Street

# test against the contents of a file
$ node analyzer/cli.js en street < nyc.names

100 Avenue
100 Drive
100 Road
... etc

# test against openaddresses data
$ cut -d',' -f4 /data/oa/de/berlin.csv | sort | uniq | node analyzer/cli.js de street

Aachener Strasse
Aalemannufer
Aalesunder Strasse
... etc
```

using the linux `diff` command you can view a side-by-side comparison of the data before and after analysis:

```bash
$ diff \
  --side-by-side \
  --ignore-blank-lines \
  --suppress-common-lines \
  nyc.names \
  <(node analyzer/cli.js en street < nyc.names)

ZEBRA PL						      |	Zebra Place
ZECK CT							      |	Zeck Court
ZEPHYR AVE						      |	Zephyr Avenue
... etc
```
