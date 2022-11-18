import { PrismaClient } from '@prisma/client';
import { green } from 'ansi-colors';

import { initKwDb } from './db/initKwDb';
import { initKanjiDb } from './db/initKanjiDb';
import { initRadicalDb } from './db/initRadicalDb';
import { initCrossDb } from './db/initCrossDb';

const prisma = new PrismaClient()

async function main() {

    await initKwDb(prisma);
    await initRadicalDb(prisma);
    await initKanjiDb(prisma);
    await initCrossDb(prisma);
    console.log(green('Finished'));


    /*
    const testCall = await prisma.kanji.findUnique({
        where: {
            literal: "犬",
        },
        include: {
            codepoint: true,
            dic_ref: true,
            meaning: true,
            misc: {
                include: {
                    grade: true,
                    jlpt: true,
                    rad_name: true,
                    strokeCount: true,
                }
            },
            nanori: true,
            query_code: true,
            reading: true,
            variant: true,
            kanjiToAntonym: {
                include: {
                    kanji_antonym: true
                } 
            },
            kanjiToLookalike: {
                include: {
                    kanji_lookalike: true
                }
            },
            kanjiToPart: {
                include: {
                    part_kanji: true,
                    part_radical: true,
                }
            },
            kanjiToSynonym: {
                include: {
                    kanji_synonym: true
                }
            },
            kanjiToVariant: {
                include: {
                    kanji_variant: true
                }
            },
        }
    });
    console.log(JSON.stringify(testCall));
    */
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })