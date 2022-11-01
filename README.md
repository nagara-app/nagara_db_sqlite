# Nagara Database


## Prerequisites

### Download input files

1. Download the following files:

| File                | Link                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| JMdict.gz           | http://ftp.edrdg.org/pub/Nihongo//JMdict.gz                              |
| JMdictFurigana.json | https://github.com/Doublevil/JmdictFurigana/releases                     |
| kanjidic2.xml.gz    | http://nihongo.monash.edu/kanjidic2/kanjidic2.xml.gz                     |
| kradzip.zip         | http://ftp.edrdg.org/pub/Nihongo/kradzip.zip                             |
| kanjidb.sqlite      | https://github.com/mifunetoshiro/kanjium/blob/master/data/kanjidb.sqlite |

2. Store the files `JMdict.gz`, `JmdictFurigana.json` and `kanjidic2.xml` files in the `input ` directory.
3. Unzip the `kradzip.zip` and store the files `kradfile`, `kradfile2` and `radkfilex` in the `input` directory.
4. Open the `kanjidb.sqlite` db with [SQLite Browser](https://sqlitebrowser.org/) and export the tables `antonyms`, `lookalikes`, `radicals`, `radvars`, and `synonyms` as `.json` files. Store the files in the `input` directory.

### Create output files

1. Run the script `npm run createOutput`. This will run following scripts:

| Script              | Description                                   | 
| ------------------- | --------------------------------------------- |
| `npm run jmdict`    | Creates the `jmdict.json` file in `output`    |
| `npm run kanjidic2` | Creates the `kanjidic2.json` file in `output` |
| `npm run radkfilex` | Creates the `kradfilex.json` file in `output` |
| `npm run kradfilex` | Creates the `radkfilex.json` file in `output` |
| `npm run radicalx`  | Creates the `radicalx.json` file in `output`  |


### Initiate the postgres database

1. Run the script `npm run migrate`.


### Create the sqlite database

1. Run the script `npm run start`.