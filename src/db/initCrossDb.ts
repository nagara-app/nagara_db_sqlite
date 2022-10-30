import { readFileSync } from 'fs';
import { join } from 'path';

import type { Prisma, PrismaClient } from '@prisma/client'
import { cyan } from 'ansi-colors';

import { KRadFileX } from '../kradfilex/model';

const kradfilexPath = join(__dirname, '..', '..', 'output/kradfilex.json');
const kradfileFile = readFileSync(kradfilexPath);
const kradfileData = JSON.parse(kradfileFile.toString()) as KRadFileX;


export async function initCrossDb(prisma: PrismaClient) {
    console.log(cyan('Initializing cross tables'));

    const kanji = await prisma.kanji.findMany();
    const radical = await prisma.radical.findMany();

    const kanjiPartData: Prisma.Cross_Kanji_PartCreateManyInput[] = [];

    kradfileData.entries.forEach(entry => {
        const kanji_id = kanji.find(a => a.literal === entry.literal)?.id;

        if (kanji_id) {

            entry.parts.forEach((part, i) => {

                const radicalPart = radical.find(a => a.literal_ === part);
                const kanjiPart = kanji.find(a => a.literal === part);

                if (radicalPart) {
                    kanjiPartData.push({
                        kanji_id: kanji_id,
                        order: i,
                        part_radical_id: radicalPart.id
                    });
                } else if (kanjiPart) {
                    kanjiPartData.push({
                        kanji_id: kanji_id,
                        order: i,
                        part_kanji_id: kanjiPart.id
                    });
                } else {
                    kanjiPartData.push({
                        kanji_id: kanji_id,
                        order: i,
                        part_component: part
                    });
                }
            });
        }
    });

    await prisma.cross_Kanji_Part.createMany({
        data: kanjiPartData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} kanji part entries`)
    });
}