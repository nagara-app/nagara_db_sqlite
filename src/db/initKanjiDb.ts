import { readFileSync } from 'fs';
import { join } from 'path';

import type { PrismaClient } from '@prisma/client'
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

    for (let i = 0; i < kanjidic2Data.character.length; i++) {
        await prisma.kanji.upsert({
            where: {
                literal: kanjidic2Data.character[i].literal
            },
            create: {
                literal: kanjidic2Data.character[i].literal
            },
            update: {}
        });
    };
    console.log(`Created ${await prisma.kanji.count()} kanji entries`);
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

    for (const character of kanjidic2Data.character) {

        const kanji_id = kanji.find(a => a.literal === character.literal)?.id;

        if (kanji_id) {

            // Create codepoint data
            const cp_value = character.codepoint.cp_value;
            for (let i = 0; i < cp_value.length; i++) {
                const kwCodePointType_id = kwCodepointTypeEntries.find(a => a.value === cp_value[i].cp_type)?.id;

                if (kwCodePointType_id) {
                    await prisma.kanji_Codepoint.upsert({
                        where: {
                            kanji_id_kw_codepoint_id: {
                                kanji_id: kanji_id,
                                kw_codepoint_id: kwCodePointType_id
                            }
                        },
                        create: {
                            kanji_id: kanji_id,
                            kw_codepoint_id: kwCodePointType_id,
                            value: cp_value[i].value
                        },
                        update: {}
                    });
                };
            };


            // Create misc data
            const strokeCountArr = Array.isArray(character.misc.stroke_count) ? character.misc.stroke_count : [character.misc.stroke_count];
            const kwStrokeCount_id = kwStrokeCountEntries.find(a => a.value === +strokeCountArr[0])?.id;

            const kwGrade_id = kwGradeEntries.find(a => a.value === character.misc.grade)?.id;
            const jlpt_id = kwJLPTEntries.find(a => a.value === character.misc.jlpt)?.id;

            if (kwStrokeCount_id) {
                await prisma.kanji_Misc.upsert({
                    where: {
                        kanji_id: kanji_id
                    },
                    create: {
                        kanji_id: kanji_id,
                        strokeCount_id: kwStrokeCount_id,
                        freq: character.misc.freq ? +character.misc.freq : null,
                        grade_id: kwGrade_id ? kwGrade_id : null,
                        jlpt_id: jlpt_id ? jlpt_id : null,
                    },
                    update: {}
                });
            };

            // Create dic ref data
            if (character.dic_number) {
                const dicRefArr = Array.isArray(character.dic_number.dic_ref) ? character.dic_number.dic_ref : [character.dic_number.dic_ref];

                for (let i = 0; i < dicRefArr.length; i++) {
                    const kwDicRefType_id = kwDicRefTypeEntries.find(a => a.value === dicRefArr[i].dr_type)?.id;
                    const kwMorohashiVol_id = kwMorohashiVolEntries.find(a => a.value === dicRefArr[i].m_vol)?.id;

                    if (kwDicRefType_id) {

                        await prisma.kanji_DicRef.upsert({
                            where: {
                                kanji_id_kwDicRefType_id: {
                                    kanji_id: kanji_id,
                                    kwDicRefType_id: kwDicRefType_id
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kwDicRefType_id: kwDicRefType_id,
                                value: dicRefArr[i].value,
                                kwMorohashiVol_id: kwMorohashiVol_id,
                                mPage: dicRefArr[i].m_page ? Number(dicRefArr[i].m_page) : null
                            },
                            update: {}
                        });
                    };
                };
            };

            // Create query code data
            if (character.query_code) {
                const queryCodeArr = Array.isArray(character.query_code.q_code) ? character.query_code.q_code : [character.query_code.q_code];

                for (let i = 0; i < queryCodeArr.length; i++) {

                    const kwQueryCodeType_id = kwQueryCodeTypeEntries.find(a => a.value === queryCodeArr[i].qc_type)?.id;
                    const kwSkipMisclass_id = kwSkipMisclassEntries.find(a => a.value === queryCodeArr[i].skip_misclass)?.id;

                    if (kwQueryCodeType_id) {

                        await prisma.kanji_QueryCode.upsert({
                            where: {
                                kanji_id_kwQueryCodeType_id: {
                                    kanji_id: kanji_id,
                                    kwQueryCodeType_id: kwQueryCodeType_id
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kwQueryCodeType_id: kwQueryCodeType_id,
                                kwSkipMisclass_id: kwSkipMisclass_id ? kwSkipMisclass_id : null,
                                value: queryCodeArr[i].value
                            },
                            update: {}
                        });
                    };
                };
            };

            // Create reading data
            if (character.reading_meaning?.rmgroup?.reading) {
                const readingArr = Array.isArray(character.reading_meaning.rmgroup.reading) ? character.reading_meaning.rmgroup.reading : [character.reading_meaning.rmgroup.reading];

                for (let i = 0; i < readingArr.length; i++) {
                    const kwKanjiReadingType_id = kwKanjiReadingTypeEntries.find(a => a.value === readingArr[i].r_type)?.id;

                    if (kwKanjiReadingType_id) {
                        await prisma.kanji_Reading.upsert({
                            where: {
                                kanji_id_kwKanjiReadingType_id_value: {
                                    kanji_id: kanji_id,
                                    kwKanjiReadingType_id: kwKanjiReadingType_id,
                                    value: readingArr[i].value
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kwKanjiReadingType_id: kwKanjiReadingType_id,
                                value: readingArr[i].value
                            },
                            update: {}
                        });
                    };
                };
            };

            // Create meaning data
            if (character.reading_meaning?.rmgroup?.meaning) {
                const meaningArr = Array.isArray(character.reading_meaning.rmgroup.meaning) ? character.reading_meaning.rmgroup.meaning : [character.reading_meaning.rmgroup.meaning];

                for (let i = 0; i < meaningArr.length; i++) {

                    const meaning = meaningArr[i];
                    if (typeof meaning === "string") {
                        const kwLang_id = kwLangEntries.find(a => a.value === "en")?.id;
                        if (kwLang_id)
                            await prisma.kanji_Meaning.upsert({
                                where: {
                                    kanji_id_kwLang_id_value: {
                                        kanji_id: kanji_id,
                                        kwLang_id: kwLang_id,
                                        value: meaning
                                    }
                                },
                                create: {
                                    kanji_id: kanji_id,
                                    kwLang_id: kwLang_id,
                                    value: meaning
                                },
                                update: {}
                            });
                    } else {
                        const kwLang_id = kwLangEntries.find(a => a.value === meaning.m_lang)?.id;
                        if (kwLang_id)
                            await prisma.kanji_Meaning.upsert({
                                where: {
                                    kanji_id_kwLang_id_value: {
                                        kanji_id: kanji_id,
                                        kwLang_id: kwLang_id,
                                        value: meaning.value
                                    }
                                },
                                create: {
                                    kanji_id: kanji_id,
                                    kwLang_id: kwLang_id,
                                    value: meaning.value
                                },
                                update: {}
                            });
                    };
                };
            };

            // Create nanori data
            if (character.reading_meaning?.nanori) {
                const nanoriArr = Array.isArray(character.reading_meaning.nanori) ? character.reading_meaning.nanori : [character.reading_meaning.nanori];

                for (let i = 0; i < nanoriArr.length; i++) {

                    await prisma.kanji_Nanori.upsert({
                        where: {
                            kanji_id_value: {
                                kanji_id: kanji_id,
                                value: nanoriArr[i]
                            },
                        },
                        create: {
                            kanji_id: kanji_id,
                            value: nanoriArr[i]
                        },
                        update: {}
                    });
                };
            };



            // Create variant data
            if (character.misc.variant) {
                const variants = Array.isArray(character.misc.variant) ? character.misc.variant : [character.misc.variant];

                for (let i = 0; i < variants.length; i++) {

                    const identifiedKanji = kanjidic2Data.character.find(a => a.codepoint.cp_value.find(a => a.cp_type === variants[i].var_type && a.value === variants[i].value));
                    if (identifiedKanji) {
                        const kanjiVariantFromDb = await prisma.kanji.findUnique({
                            where: {
                                literal: identifiedKanji.literal
                            }
                        })
                        if (kanjiVariantFromDb) {
                            await prisma.kanji_Variant.upsert({
                                where: {
                                    kanji_id_kanji_variant_id: {
                                        kanji_id: kanji_id,
                                        kanji_variant_id: kanjiVariantFromDb.id
                                    }
                                },
                                create: {
                                    kanji_id: kanji_id,
                                    kanji_variant_id: kanjiVariantFromDb.id,
                                },
                                update: {}
                            });
                        };
                    };
                };

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
                        await prisma.kanji_Antonym.upsert({
                            where: {
                                kanji_id_kanji_antonym_id: {
                                    kanji_id: kanji_id,
                                    kanji_antonym_id: kanjiAntonymFromDb.id
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kanji_antonym_id: kanjiAntonymFromDb.id
                            },
                            update: {}
                        });
                    };
                };
            };

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
                        await prisma.kanji_Lookalike.upsert({
                            where: {
                                kanji_id_kanji_lookalike_id: {
                                    kanji_id: kanji_id,
                                    kanji_lookalike_id: kanjiLookalikeFromDb.id
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kanji_lookalike_id: kanjiLookalikeFromDb.id
                            },
                            update: {}
                        });
                    };
                };
            };

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
                        await prisma.kanji_Synonym.upsert({
                            where: {
                                kanji_id_kanji_synonym_id: {
                                    kanji_id: kanji_id,
                                    kanji_synonym_id: kanjiSynonymFromDb.id
                                }
                            },
                            create: {
                                kanji_id: kanji_id,
                                kanji_synonym_id: kanjiSynonymFromDb.id
                            },
                            update: {}
                        });
                    };
                };
            };
        };
    };
    console.log(`Created ${await prisma.kanji_Codepoint.count()} codepoint entries`);
    console.log(`Created ${await prisma.kanji_Misc.count()} misc entries`);
    console.log(`Created ${await prisma.kanji_DicRef.count()} dictionary reference entries`);
    console.log(`Created ${await prisma.kanji_QueryCode.count()} query code entries`);
    console.log(`Created ${await prisma.kanji_Reading.count()} reading entries`);
    console.log(`Created ${await prisma.kanji_Meaning.count()} meaning entries`);
    console.log(`Created ${await prisma.kanji_Nanori.count()} nanori entries`);
    console.log(`Created ${await prisma.kanji_Variant.count()} variant entries`);
    console.log(`Created ${await prisma.kanji_Antonym.count()} antonym entries`);
    console.log(`Created ${await prisma.kanji_Lookalike.count()} lookalike entries`);
    console.log(`Created ${await prisma.kanji_Synonym.count()} synonym entries`);
};