// Documentation
// https://github.com/Doublevil/JmdictFurigana/blob/master/README.md

interface JMdictFurigana {
    entry: Entry[];
}

interface Entry {
    text: string;
    reading: string;
    furigana: Furigana[];
}

interface Furigana {
    ruby: string;
    rt?: string;
}