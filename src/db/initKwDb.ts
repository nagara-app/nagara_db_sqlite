import { readFileSync } from 'fs';
import { join } from 'path';

import type { PrismaClient } from '@prisma/client'

import { Kanjidic2 } from '../kanjidic2/model';
import { cyan } from 'ansi-colors';

const kanjidic2Path = join(__dirname, '..', '..', 'output/kanjidic2.json');
const kanjidic2File = readFileSync(kanjidic2Path);
const kanjidic2Data = JSON.parse(kanjidic2File.toString()) as Kanjidic2;

export async function initKwDb(prisma: PrismaClient) {
    console.log(cyan('Initializing keyword tables'));

    // Boiler plate for unique keyword values
    const codepointTypes: string[] = [];
    const dicRefTypes: string[] = [];
    const grades: string[] = [];
    const jlptLevels: string[] = [];
    const kanjiReadingTypes: string[] = [];
    const languages: string[] = ['en'];
    const misclassifications: string[] = [];
    const morohashiVolumes: string[] = [];
    const queryCodeTypes: string[] = [];
    const radicalTypes: string[] = [];
    const strokeCounts: string[] = [];

    // Loop through kanjidic2 characters
    kanjidic2Data.character.forEach(async char => {

        // Get unique codepoint type values
        char.codepoint.cp_value.forEach(cp_value => {
            if (!codepointTypes.includes(cp_value.cp_type)) codepointTypes.push(cp_value.cp_type)
        });

        // Get unique radical type values
        const radValueArr = Array.isArray(char.radical.rad_value) ? char.radical.rad_value : [char.radical.rad_value];
        radValueArr.forEach(rad_value => {
            if (!radicalTypes.includes(rad_value.rad_type)) radicalTypes.push(rad_value.rad_type)
        });

        // Get unique dictionary reference types and morohashi volume values
        if (char.dic_number?.dic_ref) {
            const dicRefArr = Array.isArray(char.dic_number.dic_ref) ? char.dic_number.dic_ref : [char.dic_number.dic_ref];
            dicRefArr.forEach(dic_ref => {
                if (!dicRefTypes.includes(dic_ref.dr_type)) dicRefTypes.push(dic_ref.dr_type)
                if (dic_ref.m_vol && !morohashiVolumes.includes(dic_ref.m_vol)) morohashiVolumes.push(dic_ref.m_vol)
            });
        }

        // Get unique querycode and misclassification values
        if (char.query_code?.q_code) {
            const queryCodeArr = Array.isArray(char.query_code?.q_code) ? char.query_code?.q_code : [char.query_code?.q_code]
            queryCodeArr.forEach(q_code => {
                if (!queryCodeTypes.includes(q_code.qc_type)) queryCodeTypes.push(q_code.qc_type)
                if (q_code.skip_misclass && !misclassifications.includes(q_code.skip_misclass)) misclassifications.push(q_code.skip_misclass)
            })
        }

        // Get unique reading type values
        if (char.reading_meaning?.rmgroup?.reading) {

            const readingArr = Array.isArray(char.reading_meaning.rmgroup.reading) ? char.reading_meaning.rmgroup.reading : [char.reading_meaning.rmgroup.reading];
            readingArr.forEach(reading => {
                if (!kanjiReadingTypes.includes(reading.r_type)) kanjiReadingTypes.push(reading.r_type)
            });
        }

        // Get unique language values
        if (char.reading_meaning?.rmgroup?.meaning) {
            const meaningArr = Array.isArray(char.reading_meaning.rmgroup.meaning) ? char.reading_meaning.rmgroup.meaning : [char.reading_meaning.rmgroup.meaning];
            meaningArr.forEach(meaning => {
                if (typeof meaning !== "string") {
                    if (!languages.includes(meaning.m_lang)) languages.push(meaning.m_lang)
                }
            });
        }

        // Get unique JLPT level values
        if (char.misc.jlpt && !jlptLevels.includes(char.misc.jlpt)) jlptLevels.push(char.misc.jlpt)

        // Get unique grade values
        if (char.misc.grade && !grades.includes(char.misc.grade)) grades.push(char.misc.grade);

        // Get unique stroke count values
        const strokeCountArr = Array.isArray(char.misc.stroke_count) ? char.misc.stroke_count : [char.misc.stroke_count];
        strokeCountArr.forEach(stroke_count => {
            if (!strokeCounts.includes(stroke_count)) strokeCounts.push(stroke_count)
        });
    });

    // Create all entries
    await prisma.kwCodepointType.createMany({
        data: codepointTypes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} codepoint type entries`)
    });

    await prisma.kwDicRefType.createMany({
        data: dicRefTypes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} dictionary reference type entries`)
    });

    await prisma.kwGrade.createMany({
        data: grades.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} grade entries`)
    });

    await prisma.kwJLPT.createMany({
        data: jlptLevels.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} JLPT entries`)
    });

    await prisma.kwKanjiReadingType.createMany({
        data: kanjiReadingTypes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} reading type entries`)
    });

    await prisma.kwLang.createMany({
        data: languages.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} language entries`)
    });

    await prisma.kwMorohashiVol.createMany({
        data: morohashiVolumes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} morohashi volume entries`)
    });

    await prisma.kwQueryCodeType.createMany({
        data: queryCodeTypes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} query code type entries`)
    });

    await prisma.kwRadicalType.createMany({
        data: radicalTypes.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} radical type entries`)
    });

    await prisma.kwSkipMisclass.createMany({
        data: misclassifications.map(v => ({ value: v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} mis classification entries`)
    });

    await prisma.kwStrokeCount.createMany({
        data: strokeCounts.map(v => ({ value: +v })),
        skipDuplicates: true
    }).then(v => {
        console.log(`Created ${v.count.toString()} stroke count entries`)
    });
}