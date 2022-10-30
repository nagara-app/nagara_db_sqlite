import { readFileSync } from 'fs';
import { join } from 'path';

import type { Prisma, PrismaClient } from '@prisma/client'
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

    const radicalData: Prisma.RadicalCreateManyInput[] =
        nagaraRadicalData.map(v => (
            {
                number: v.number,
                literal: v.literal,
                literal_: v._literal,
                stroke_count: v.stroke_count,
                is_variant: false,
            }));

    for (const radical of nagaraRadicalData) {
        for (const radicalVersion of radical.variant) {
            radicalData.push({
                number: radical.number,
                literal: radicalVersion.literal,
                literal_: radicalVersion._literal,
                stroke_count: radicalVersion.stroke_count,
                is_variant: true,
            })
        }
    }

    await prisma.radical.createMany({
        data: radicalData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} radical entries`)
    });
}

async function init2Db(prisma: PrismaClient) {

    const radicalReadingData: Prisma.Radical_ReadingCreateManyInput[] = [];
    const radicalMeaningData: Prisma.Radical_MeaningCreateManyInput[] = [];
    const radicalVariantData: Prisma.Radical_VariantCreateManyInput[] = [];

    const radical = await prisma.radical.findMany();

    for (const entry of nagaraRadicalData) {

        const radical_id = radical.find(a => a.literal === entry.literal)?.id;

        if (radical_id) {

            // Create reading data
            entry.reading.forEach(reading => {

                radicalReadingData.push({
                    radical_id: radical_id,
                    value: reading
                });
            });

            // Create meaning data
            entry.meaning.forEach(meaning => {

                radicalMeaningData.push({
                    radical_id: radical_id,
                    value: meaning
                });
            });

            // Create variant data
            entry.variant.forEach(async variant => {

                const radicalVariantFromDb = await prisma.radical.findUnique({
                    where: {
                        literal: variant.literal
                    }
                });

                if (radicalVariantFromDb) {
                    radicalVariantData.push({
                        radical_id: radical_id,
                        radical_variant_id: radicalVariantFromDb.id
                    });
                }
            });
        }
    }

    await prisma.radical_Reading.createMany({
        data: radicalReadingData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} reading entries`)
    });

    await prisma.radical_Meaning.createMany({
        data: radicalMeaningData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} meaning entries`)
    });

    await prisma.radical_Variant.createMany({
        data: radicalVariantData,
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} variant entries`)
    });
} 