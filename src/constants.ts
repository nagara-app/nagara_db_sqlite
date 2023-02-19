export namespace Constants {
    export const inputDir = 'input';
    export const inputConvertedDir = 'converted';
    export const outputDir = 'output';
    export const fileNames = {
        jmdict: "JMdict.gz",
        jmdictConverted: "jmdict.json",
        jmdictFurigana: "JmdictFurigana.json",
        tkdbJson: "tkdb.json",
        jmdictJlpt: "jmdict_jlpt.json",
        tkdbJmdictJlpt: "tkdb_jmdict_jlpt.json",
        tanosVocab: "tanos_vocab.csv",
        tanosVocabConverted: "tanos_vocab.json",
        kanjidic2: "kanjidic2.xml.gz",
        kanjidic2Converted: "kanjidic2.json",
    };
    export const commonTags = ["news1", "ichi1", "spec1", "spec2", "gai1"];
    export const langCodeEnglish = "eng";
    export const jmdictXrefSeparator = "・";
    export const csvDelimiter = ",";
    export const tanosDelimiter = ";";
    export const tanosVocabSuruSuffix = "・する";
}