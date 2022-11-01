import { readFileSync } from 'fs';
import { join } from 'path';

import type { PrismaClient } from '@prisma/client'
import { cyan } from 'ansi-colors';

import { Radicalx } from '../radicalx/model';

const nagaraRadicalPath = join(__dirname, '..', '..', 'output/radicalx.json');
const nagaraRadicalFile = readFileSync(nagaraRadicalPath);
const nagaraRadicalData = JSON.parse(nagaraRadicalFile.toString()) as Radicalx[];

export async function initRadicalDb(prisma: PrismaClient) {
    console.log(cyan('Initializing radical tables'));
    await init1Db(prisma);
    await init2Db(prisma);
}

async function init1Db(prisma: PrismaClient) {

    for (let i = 0; i < nagaraRadicalData.length; i++) {
        const radical = nagaraRadicalData[i];

        await prisma.radical.upsert({
            where: {
                literal: radical.literal
            },
            create: {
                number: radical.number,
                literal: radical.literal,
                literal_: radical._literal,
                stroke_count: radical.stroke_count,
                is_variant: false
            },
            update: {},
        });

        for (let ix = 0; ix < radical.variant.length; ix++) {

            await prisma.radical.upsert({
                where: {
                    literal: radical.variant[ix].literal
                },
                create: {
                    number: radical.number,
                    literal: radical.variant[ix].literal,
                    literal_: radical.variant[ix]._literal,
                    stroke_count: radical.variant[ix].stroke_count,
                    is_variant: true,
                },
                update: {},
            });
        }
    }
    console.log(`Created ${await prisma.radical.count()} radical entries`);
}

async function init2Db(prisma: PrismaClient) {

    const radical = await prisma.radical.findMany();

    for (const entry of nagaraRadicalData) {

        const radical_id = radical.find(a => a.literal === entry.literal)?.id;

        if (radical_id) {

            // Create reading data
            for (let i = 0; i < entry.reading.length; i++) {
                await prisma.radical_Reading.upsert({
                    where: {
                        radical_id_value: {
                            radical_id: radical_id,
                            value: entry.reading[i]
                        }
                    },
                    create: {
                        radical_id: radical_id,
                        value: entry.reading[i]
                    },
                    update: {}
                });
            };

            // Create meaning data
            for (let i = 0; i < entry.meaning.length; i++) {
                await prisma.radical_Meaning.upsert({
                    where: {
                        radical_id_value: {
                            radical_id: radical_id,
                            value: entry.meaning[i]
                        }
                    },
                    create: {
                        radical_id: radical_id,
                        value: entry.meaning[i]
                    },
                    update: {}
                });
            };

            // Create variant data
            for (let i = 0; i < entry.variant.length; i++) {
   
                const radicalVariantFromDb = await prisma.radical.findUnique({
                    where: {
                        literal: entry.variant[i].literal
                    }
                });

                if (radicalVariantFromDb) {

                    await prisma.radical_Variant.upsert({
                        where: {
                            radical_id_radical_variant_id: {
                                radical_id: radical_id,
                                radical_variant_id: radicalVariantFromDb.id
                            }
                        },
                        create: {
                            radical_id: radical_id,
                            radical_variant_id: radicalVariantFromDb.id,
                        },
                        update: {}
                    });
                };
            };
        };
    };

    console.log(`Created ${await prisma.radical_Reading.count()} reading entries`);
    console.log(`Created ${await prisma.radical_Meaning.count()} meaning entries`);
    console.log(`Created ${await prisma.radical_Variant.count()} variant entries`);
} 