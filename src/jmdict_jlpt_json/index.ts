import { Options, Presets, SingleBar } from "cli-progress";

import { readFileFromInput, toArray, writeFileToInputConverted } from "../utils";
import { Constants } from "../constants";

import type { TanosVocab } from "../convert_input/tanos_vocab/tanos_vocab.dto";
import { JMdictJlpt, JMdictJlptMatch } from "./jmdict_jlpt.dto";
import type { JMdict, JMdictKanji, JMdictRdng, JMdictSens } from "../convert_input/jmdict/jmdict.dto";


const main = async () => {

    const jmdictJson: JMdict = await readFileFromInput(Constants.fileNames.jmdictConverted, true, true);
    const tanosVocabJson: TanosVocab[] = await readFileFromInput(Constants.fileNames.tanosVocabConverted, true, true);

    const jmdictJlptEntries: JMdictJlpt[] = [];

    const progressOptions: Options = {
        hideCursor: true,
        etaBuffer: 10000,
    }
    const progressBar = new SingleBar(progressOptions, Presets.shades_classic);
    progressBar.start(tanosVocabJson.length, 0);
    let i = 1;

    const unassignedTanosEntries: TanosVocab[] = [];

    for (const tanosVocabEntry of tanosVocabJson) {

        progressBar.update(i);
        i++;

        const tanosKanjis = tanosVocabEntry.kanji.split(Constants.tanosDelimiter);
        const tanosKanas = tanosVocabEntry.kana.replace(Constants.tanosVocabSuruSuffix, "").split(Constants.tanosDelimiter);
        const tanosEnglishMeanings = tanosVocabEntry.english.toLowerCase().split(Constants.tanosDelimiter);

        const jmdictEntryByKanjiReading = jmdictJson.entry.find(a => {
            return kanjiMatch(toArray(a.k_ele), tanosKanjis) && readingMatch(toArray(a.r_ele), tanosKanas) ? true : false;
        });

        const jmdictEntryByReadingMeaning = jmdictJson.entry.find(a => {
            return readingMatch(toArray(a.r_ele), tanosKanas) && meaningMatch(toArray(a.sense), tanosEnglishMeanings) ? true : false;
        });

        if (jmdictEntryByKanjiReading) {
            jmdictJlptEntries.push({
                tanosVocab: tanosVocabEntry,
                sequence: jmdictEntryByKanjiReading.ent_seq,
                match: JMdictJlptMatch.kanjiKana
            });
        }
        else if (jmdictEntryByReadingMeaning) {
            jmdictJlptEntries.push({
                tanosVocab: tanosVocabEntry,
                sequence: jmdictEntryByReadingMeaning.ent_seq,
                match: JMdictJlptMatch.kanaMeaning,
            });
        }
        else {
            jmdictJlptEntries.push({
                tanosVocab: tanosVocabEntry,
                sequence: '',
                match: JMdictJlptMatch.unmatched,
            });
            unassignedTanosEntries.push(tanosVocabEntry)
        };
    }

    progressBar.stop();

    await writeFileToInputConverted(Constants.fileNames.jmdictJlpt, jmdictJlptEntries);
};
main();

function kanjiMatch(jmdictKanjis: JMdictKanji[], tanosKanjis: string[]): boolean {
    return jmdictKanjis.some(b => {
        return tanosKanjis.includes(b.keb) ? true : false;
    });
}

function readingMatch(jmdictKanas: JMdictRdng[], tanosKanas: string[]): boolean {
    return jmdictKanas.some(b => {
        return tanosKanas.includes(b.reb) ? true : false;
    });
}

function meaningMatch(jmdictSenses: JMdictSens[], tanosEnglishMeanings: string[]): boolean {
    return jmdictSenses.some(b => {
        return toArray(b.gloss).some(c => {
            if (typeof c === 'string') {
                return tanosEnglishMeanings.includes(c.toLowerCase()) ? true : false;
            } else {
                if (!c.lang) {
                    return tanosEnglishMeanings.includes(c.value.toLowerCase()) ? true : false;
                } else {
                    return false;
                }
            }
        });
    });
}
