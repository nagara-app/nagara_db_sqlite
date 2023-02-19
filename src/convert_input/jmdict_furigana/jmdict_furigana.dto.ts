// Documentation
// https://github.com/Doublevil/JmdictFurigana/blob/master/README.md

export interface JMdictFurigana {
    text: string;
    reading: string;
    furigana: JMdictFurigana_Furigana[];
}

interface JMdictFurigana_Furigana {
    ruby: string;
    rt?: string;
}