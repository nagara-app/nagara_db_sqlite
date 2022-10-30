import { readFileSync } from 'fs';
import { join } from 'path';

import type { Prisma, PrismaClient } from '@prisma/client'
import { cyan } from 'ansi-colors';

import { Kanjidic2 } from '../kanjidic2/model';
import { Antonym, Lookalike, Synonym } from '../kanjium/model';

const kanjidic2Path = join(__dirname, '..', '..', 'output/kanjidic2.json');
const kanjidic2File = readFileSync(kanjidic2Path);
const kanjidic2Data = JSON.parse(kanjidic2File.toString()) as Kanjidic2;

const antonymsPath = join(__dirname, '..', '..', 'input/antonyms.json');
const antonymsFile = readFileSync(antonymsPath);
const antonymsData = JSON.parse(antonymsFile.toString()) as Antonym[];

const lookalikesPath = join(__dirname, '..', '..', 'input/lookalikes.json');
const lookalikesFile = readFileSync(lookalikesPath);
const lookalikesData = JSON.parse(lookalikesFile.toString()) as Lookalike[];

const synonymsPath = join(__dirname, '..', '..', 'input/synonyms.json');
const synonymsFile = readFileSync(synonymsPath);
const synonymsData = JSON.parse(synonymsFile.toString()) as Synonym[];

export async function initKanjiDb(prisma: PrismaClient) {
    console.log(cyan('Initializing kanji tables'));
    await init1Db(prisma);
    await init2Db(prisma);
}

async function init1Db(prisma: PrismaClient) {
    await prisma.kanji.createMany({
        data: kanjidic2Data.character.map(v => ({ literal: v.literal })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} kanji entries`)
    });
}

async function init2Db(prisma: PrismaClient) {

    const kwCodepointTypeEntries = await prisma.kwCodepointType.findMany();
    const kwDicRefTypeEntries = await prisma.kwDicRefType.findMany();
    const kwGradeEntries = await prisma.kwGrade.findMany();
    const kwJLPTEntries = await prisma.kwJLPT.findMany();
    const kwKanjiReadingTypeEntries = await prisma.kwKanjiReadingType.findMany();
    const kwLangEntries = await prisma.kwLang.findMany();
    const kwMorohashiVolEntries = await prisma.kwMorohashiVol.findMany();
    const kwQueryCodeTypeEntries = await prisma.kwQueryCodeType.findMany();
    const kwSkipMisclassEntries = await prisma.kwSkipMisclass.findMany();
    const kwStrokeCountEntries = await prisma.kwStrokeCount.findMany();

    const kanji = await prisma.kanji.findMany();

    const kanjiCodepointData: Prisma.Kanji_CodepointCreateManyInput[] = [];
    const kanjiReadingData: Prisma.Kanji_ReadingCreateManyInput[] = [];
    const kanjiMiscData: Prisma.Kanji_MiscCreateManyInput[] = [];
    const kanjiDicRefData: Prisma.Kanji_DicRefCreateManyInput[] = [];
    const kanjiQueryCodeData: Prisma.Kanji_QueryCodeCreateManyInput[] = [];
    const kanjiMeaningData: Prisma.Kanji_MeaningCreateManyInput[] = [];
    const kanjiNanoriData: Prisma.Kanji_NanoriCreateManyInput[] = [];
    const kanjiVariantData: Prisma.Kanji_VariantCreateManyInput[] = [];
    const kanjiAntonymData: Prisma.Kanji_AntonymCreateManyInput[] = [];
    const kanjiLookalikeData: Prisma.Kanji_LookalikeCreateManyInput[] = [];
    const kanjiSynonymData: Prisma.Kanji_SynonymCreateManyInput[] = [];

    for (const character of kanjidic2Data.character) {

        const kanji_id = kanji.find(a => a.literal === character.literal)?.id;

        if (kanji_id) {

            // Create codepoint data
            character.codepoint.cp_value.forEach(cp_value => {
                const kwCodePointType_id = kwCodepointTypeEntries.find(a => a.value === cp_value.cp_type)?.id;

                if (kwCodePointType_id) {
                    kanjiCodepointData.push({
                        kanji_id: kanji_id,
                        kw_codepoint_id: kwCodePointType_id,
                        value: cp_value.value
                    });
                }
            });

            // Create misc data
            const strokeCountArr = Array.isArray(character.misc.stroke_count) ? character.misc.stroke_count : [character.misc.stroke_count];
            const kwStrokeCount_id = kwStrokeCountEntries.find(a => a.value === +strokeCountArr[0])?.id;

            const kwGrade_id = kwGradeEntries.find(a => a.value === character.misc.grade)?.id;
            const jlpt_id = kwJLPTEntries.find(a => a.value === character.misc.jlpt)?.id;

            if (kwStrokeCount_id) {
                kanjiMiscData.push({
                    kanji_id: kanji_id,
                    strokeCount_id: kwStrokeCount_id,
                    freq: character.misc.freq ? +character.misc.freq : null,
                    grade_id: kwGrade_id ? kwGrade_id : null,
                    jlpt_id: jlpt_id ? jlpt_id : null,
                })
            }

            // Create dic ref data
            if (character.dic_number) {
                const dicRefArr = Array.isArray(character.dic_number.dic_ref) ? character.dic_number.dic_ref : [character.dic_number.dic_ref];

                dicRefArr.forEach(dicRef => {

                    const kwDicRefType_id = kwDicRefTypeEntries.find(a => a.value === dicRef.dr_type)?.id;
                    const kwMorohashiVol_id = kwMorohashiVolEntries.find(a => a.value === dicRef.m_vol)?.id;

                    if (kwDicRefType_id) {
                        kanjiDicRefData.push({
                            kanji_id: kanji_id,
                            kwDicRefType_id: kwDicRefType_id,
                            value: dicRef.value,
                            kwMorohashiVol_id: kwMorohashiVol_id,
                            mPage: dicRef.m_page ? +dicRef.m_page : null
                        });
                    }
                });
            }

            // Create query code data
            if (character.query_code) {
                const queryCodeArr = Array.isArray(character.query_code.q_code) ? character.query_code.q_code : [character.query_code.q_code];

                queryCodeArr.forEach(queryCode => {

                    const kwQueryCodeType_id = kwQueryCodeTypeEntries.find(a => a.value === queryCode.qc_type)?.id;
                    const kwSkipMisclass_id = kwSkipMisclassEntries.find(a => a.value === queryCode.skip_misclass)?.id;

                    if (kwQueryCodeType_id) {
                        kanjiQueryCodeData.push({
                            kanji_id: kanji_id,
                            kwQueryCodeType_id: kwQueryCodeType_id,
                            kwSkipMisclass_id: kwSkipMisclass_id ? kwSkipMisclass_id : null,
                            value: queryCode.value
                        })
                    }
                });
            }

            // Create reading data
            if (character.reading_meaning?.rmgroup?.reading) {
                const readingArr = Array.isArray(character.reading_meaning.rmgroup.reading) ? character.reading_meaning.rmgroup.reading : [character.reading_meaning.rmgroup.reading];

                readingArr.forEach(reading => {

                    const kwKanjiReadingType_id = kwKanjiReadingTypeEntries.find(a => a.value === reading.r_type)?.id;

                    if (kwKanjiReadingType_id) {
                        kanjiReadingData.push({
                            kanji_id: kanji_id,
                            kwKanjiReadingType_id: kwKanjiReadingType_id,
                            value: reading.value
                        });
                    }
                });
            }

            // Create meaning data
            if (character.reading_meaning?.rmgroup?.meaning) {
                const meaningArr = Array.isArray(character.reading_meaning.rmgroup.meaning) ? character.reading_meaning.rmgroup.meaning : [character.reading_meaning.rmgroup.meaning];

                meaningArr.forEach(meaning => {

                    if (typeof meaning === "string") {
                        const kwLang_id = kwLangEntries.find(a => a.value === "en")?.id;
                        if (kwLang_id)
                            kanjiMeaningData.push({
                                kanji_id: kanji_id,
                                kwLang_id: kwLang_id,
                                value: meaning
                            });
                    } else {
                        const kwLang_id = kwLangEntries.find(a => a.value === meaning.m_lang)?.id;
                        if (kwLang_id)
                            kanjiMeaningData.push({
                                kanji_id: kanji_id,
                                kwLang_id: kwLang_id,
                                value: meaning.value
                            });
                    }
                });
            }

            // Create nanori data
            if (character.reading_meaning?.nanori) {
                const nanoriArr = Array.isArray(character.reading_meaning.nanori) ? character.reading_meaning.nanori : [character.reading_meaning.nanori];

                nanoriArr.forEach(nanori => {

                    kanjiNanoriData.push({
                        kanji_id: kanji_id,
                        value: nanori
                    });
                });
            }

            // Create variant data
            if (character.misc.variant) {
                const variants = Array.isArray(character.misc.variant) ? character.misc.variant : [character.misc.variant];

                variants.forEach(async variant => {

                    const identifiedKanji = kanjidic2Data.character.find(a => a.codepoint.cp_value.find(a => a.cp_type === variant.var_type && a.value === variant.value));
                    if (identifiedKanji) {
                        const kanjiVariantFromDb = await prisma.kanji.findUnique({
                            where: {
                                literal: identifiedKanji.literal
                            }
                        })
                        if (kanjiVariantFromDb) {
                            kanjiVariantData.push({
                                kanji_id: kanji_id,
                                kanji_variant_id: kanjiVariantFromDb.id,
                            })
                        }
                    }
                });
            }

            // Create antonyms data
            const antonymEntry = antonymsData.find(a => a.kanji === character.literal);
            if (antonymEntry) {
                const antonyms = antonymEntry.antonyms.split(",");
                for (const antonym of antonyms) {
                    const kanjiAntonymFromDb = await prisma.kanji.findUnique({
                        where: {
                            literal: antonym
                        }
                    });
                    if (kanjiAntonymFromDb) {
                        kanjiAntonymData.push({
                            kanji_id: kanji_id,
                            kanji_antonym_id: kanjiAntonymFromDb.id
                        })
                    }
                }
            }

            // Create lookalike data
            const lookalikeEntry = lookalikesData.find(a => a.kanji === character.literal);
            if (lookalikeEntry) {
                const lookalikes = lookalikeEntry.similar.split(",");
                for (const lookalike of lookalikes) {
                    const kanjiLookalikeFromDb = await prisma.kanji.findUnique({
                        where: {
                            literal: lookalike
                        }
                    });
                    if (kanjiLookalikeFromDb) {
                        kanjiLookalikeData.push({
                            kanji_id: kanji_id,
                            kanji_lookalike_id: kanjiLookalikeFromDb.id
                        })
                    }
                }
            }

            // Create synonym data
            const synonymEntry = synonymsData.find(a => a.kanji === character.literal);
            if (synonymEntry) {
                const synonyms = synonymEntry.synonyms.split(",");
                for (const synonym of synonyms) {
                    const kanjiSynonymFromDb = await prisma.kanji.findUnique({
                        where: {
                            literal: synonym
                        }
                    });
                    if (kanjiSynonymFromDb) {
                        kanjiSynonymData.push({
                            kanji_id: kanji_id,
                            kanji_synonym_id: kanjiSynonymFromDb.id
                        })
                    }
                }
            }
        }
    };

    await prisma.kanji_Codepoint.createMany({
        data: kanjiCodepointData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} codepoint entries`)
    });

    await prisma.kanji_Misc.createMany({
        data: kanjiMiscData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} misc entries`)
    });

    await prisma.kanji_DicRef.createMany({
        data: kanjiDicRefData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} dictionary reference entries`)
    });

    await prisma.kanji_QueryCode.createMany({
        data: kanjiQueryCodeData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} query code entries`)
    });

    await prisma.kanji_Reading.createMany({
        data: kanjiReadingData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} reading entries`)
    });

    await prisma.kanji_Meaning.createMany({
        data: kanjiMeaningData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} meaning entries`)
    });

    await prisma.kanji_Nanori.createMany({
        data: kanjiNanoriData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} nanori entries`)
    });

    await prisma.kanji_Variant.createMany({
        data: kanjiVariantData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} variant entries`)
    });

    await prisma.kanji_Antonym.createMany({
        data: kanjiAntonymData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} antonym entries`)
    });

    await prisma.kanji_Lookalike.createMany({
        data: kanjiLookalikeData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} lookalike entries`)
    });

    await prisma.kanji_Synonym.createMany({
        data: kanjiSynonymData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} synonym entries`)
    });
}