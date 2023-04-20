# Tanukiwi Database (TKDB)

## What is it?

Tanukiwi Database (TKDB) is an open-source database in JSON format which consists of Japanese words, kanji and radical. The data itself is coming from several sources that were carefully selected.

You can use it for any projects, but appropiate attribution to this project and the source data must be given.

## Why was it created?

While there are many great Japanese dictionary sources, they come in different formats and focus on either vocabulary or kanji. This project aims to provide a single comprehensive database in which words, kanji, and radicals are related.

## How can I use it?

You have to build the database by yourself with Node.js and npm.

The repository is missing some source files because they are too large to commit here. Also this project does not intend to redistribute source material. Therefore, you must first download some source files, add them to the repository, and then initiate the database creation process.

Follow these steps:

1. Clone the repo.
2. Download the files from below table:

   | File                | Link                                                 |
   | ------------------- | ---------------------------------------------------- |
   | JMdict.gz           | http://ftp.edrdg.org/pub/Nihongo//JMdict.gz          |
   | JMdictFurigana.json | https://github.com/Doublevil/JmdictFurigana/releases |
   | kanjidic2.xml.gz    | http://nihongo.monash.edu/kanjidic2/kanjidic2.xml.gz |
   | kanjivg.zip         | https://github.com/KanjiVG/kanjivg/releases          |

3. Store the files in the `input` directory.
4. Run below to prepare and convert the input files.
   ```
   npm run convert
   ```
5. Run below to create the database to the `output` directory.
   ```
   npm run json
   ```

## How does it work?

All data sources are stored under `input`. If the original data source format is not JSON, a parser converts the data source to JSON and stores it under `input/converted`. A mapper file loads all JSON input files, maps them to the TKDB object and exports them as a JSON file under `output`. Prisma uses this JSON file to map it to its schema and exports it to a SQLite database under `output`.

`jmdict_jlpt.json` and `radkfilex_kanjium.json` are special files created during the conversion.

![Creation process](tkdb_creation_process.png)

## Types

- The JSON types can be derived from the [typescript interfaces](./src/tkdb_json/tkdb.model.ts).

## Example entries

### Word

```json
{
    "id": "1582710",
    "reading": [
    {
        "kanji": "日本",
        "furigana": [
        {
            "ruby": "日本",
            "rt": "にほん"
        }
        ],
        "uniqeKanji": [
        "日",
        "本"
        ],
        "kana": "にほん",
        "common": true,
        "info": []
    },
    {
        "kanji": "日本",
        "furigana": [
        {
            "ruby": "日本",
            "rt": "にっぽん"
        }
        ],
        "uniqeKanji": [
        "日",
        "本"
        ],
        "kana": "にっぽん",
        "common": true,
        "info": []
    }
    ],
    "meaning": [
    {
        "gloss": [
        {
            "value": "Japan"
        }
        ],
        "lang": "eng",
        "pos": [
        "n"
        ],
        "field": [],
        "dialect": [],
        "info": [],
        "misc": [],
        "source": [],
        "related": []
    },
    {
        "gloss": [
        {
            "value": "Japon"
        }
        ],
        "lang": "fre",
    },
    ],
    "misc": {
    "common": false,
    "jlpt": "n3"
    }
    },
```

### Kanji

```json
{
  "literal": "狸",
  "reading": {
    "kun": ["たぬき"],
    "on": ["リ", "ライ"],
    "nanori": []
  },
  "meaning": [
    {
      "lang": "eng",
      "value": "tanuki"
    },
    {
      "lang": "eng",
      "value": "raccoon"
    }
  ],
  "part": [
    {
      "literal": "犭",
      "type": "radical"
    },
    {
      "literal": "里",
      "type": "radical"
    }
  ],
  "misc": {
    "kvgHexcode": "072f8",
    "codepoint": {
      "ucs": "72f8",
      "jis208": "1-35-12"
    },
    "querycode": {
      "skip": "1-3-7",
      "shDesc": "3g7.2",
      "fourCorner": "4621.4"
    },
    "dicref": {
      "nelsonC": "2887",
      "nelsonN": "3578",
      "heisig": "2338",
      "heisig6": "2427",
      "moro": "20427:7:0701"
    },
    "antonym": [],
    "synonym": [],
    "lookalike": [],
    "strokecount": 10,
    "frequency": 2498,
    "variant": ["貍", "猍"]
  }
}
```

### Radical

```json
{
  "literal": "犭",
  "kvgHexcode": "072ad",
  "number": 94,
  "reading": ["けものへん"],
  "meaning": ["dog"],
  "strokecount": 3,
  "variantOf": "犬"
}
```

## Options

It takes about 5 minutes to build the whole JSON. To limit the entries created, add a limiter to the json script in `package.json` as in succeeding example.

```
"json": "npx ts-node src/tkdb_json/index.ts 1000",
```

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
