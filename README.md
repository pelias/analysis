


# command line interface

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
$ diff --side-by-side --ignore-blank-lines --suppress-common-lines nyc.names <(node analyzer/cli.js en street < nyc.names)
ZEBRA PL						      |	Zebra Place
ZECK CT							      |	Zeck Court
ZEPHYR AVE						    |	Zephyr Avenue
... etc
```
