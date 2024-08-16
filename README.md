# Tanukiwi Database (TKDB)

## What is it?

Tanukiwi Database (TKDB) is an open-source database in JSON format which consists of Japanese words, kanji and radical. The data itself is coming from several sources that were carefully selected.

You can use it for any projects, but appropiate attribution to this project and the source data must be given.

## Why was it created?

While there are many great Japanese dictionary sources, they come in different formats and focus on either vocabulary or kanji. This project aims to provide a single comprehensive database in which words, kanji, and radicals are related.

## How can I use it?

You have to build the database by yourself by running:

```
npm run create
```

This command includes 3 main steps.

1. Downloading all files from sources
2. Converting all files to JSON
3. Processing all files into a single JSON file called `tkdb.json` stored under [output/tkdb.json](./output/tkdb.json).

The repository is missing some source files because they are too large to commit here. Also this project does not intend to redistribute source material. Therefore, you must first download some source files, add them to the repository, and then initiate the database creation process.

## Types

- The JSON types can be derived from the [typescript interfaces](./src/type/tkdb.d.ts).

## License, copyright and attribution

This project is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). You can find the copy of this license in the [license file](LICENSE.txt).

When using this database, you must also attribute the projects from which the data source originates:

- Kanji data from [KANJIDIC2](http://www.edrdg.org/wiki/index.php/KANJIDIC_Project) by the [Electronic Dictionary Research and Development Group](https://www.edrdg.org/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Kanji decomposition data from [RADKFILE/KRADFILE](https://www.edrdg.org/krad/kradinf.html) by the [Electronic Dictionary Research and Development Group](https://www.edrdg.org/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Japanese dictionary data from [JMDICT](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) by the [Electronic Dictionary Research and Development Group](https://www.edrdg.org/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Furigana data from [JmdictFurigana](https://github.com/Doublevil/JmdictFurigana) by [Doublevil](https://github.com/Doublevil), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- JLPT data from [tanos](http://www.tanos.co.uk/jlpt/) by [Jonathan Waller](http://www.tanos.co.uk/contact/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Similar, antonym and synonym kanji data and radical data from [kanjium](https://github.com/mifunetoshiro/kanjium) by [Uros O.](https://github.com/mifunetoshiro), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Kanji stroke order graphics from [KanjiVG](https://github.com/KanjiVG/kanjivg/releases) by [Ulrich Apel](https://kanjivg.tagaini.net/index.html), licensed under [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/).
