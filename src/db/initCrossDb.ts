import { readFileSync } from 'fs';
import { join } from 'path';

import type { PrismaClient } from '@prisma/client'
import { cyan } from 'ansi-colors';

import { KRadFileX } from '../kradfilex/model';

const kradfilexPath = join(__dirname, '..', '..', 'output/kradfilex.json');
const kradfileFile = readFileSync(kradfilexPath);
const kradfileData = JSON.parse(kradfileFile.toString()) as KRadFileX;


export async function initCrossDb(prisma: PrismaClient) {
    console.log(cyan('Initializing cross tables'));

    const kanji = await prisma.kanji.findMany();
    const radical = await prisma.radical.findMany();

    for (const entry of kradfileData.entries) {
        const kanji_id = kanji.find(a => a.literal === entry.literal)?.id;

        if (kanji_id) {

            for (let i = 0; i < entry.parts.length; i++) {

                const radicalPart = radical.find(a => a.literal_ === entry.parts[i]);
                const kanjiPart = kanji.find(a => a.literal === entry.parts[i]);

                await prisma.cross_Kanji_Part.upsert({
                    where: {
                        kanji_id_order: {
                            kanji_id: kanji_id,
                            order: i
                        }
                    },
                    create: {
                        kanji_id: kanji_id,
                        order: i,
                        part_kanji_id: kanjiPart?.id ? kanjiPart.id : null,
                        part_radical_id: radicalPart?.id ? radicalPart.id: null,
                        part_component: !radicalPart?.id && !kanjiPart?.id ? entry.parts[i] : null
                    },
                    update: {
                    }
                });
            };
        };
    };
    

    console.log(`Created ${await prisma.cross_Kanji_Part.count()} kanji part entries`);
}