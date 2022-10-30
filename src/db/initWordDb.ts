import { readFileSync } from 'fs';
import { join } from 'path';

import { Prisma, PrismaClient } from '@prisma/client'
import { SingleBar } from 'cli-progress';
import { cyan } from 'ansi-colors';


import { JMDict } from '../jmdict/model';

const path = join(__dirname, '..', '..', 'output/jmdict.json');
const file = readFileSync(path);
const data = JSON.parse(file.toString()) as JMDict;

export async function initWordDb(prisma: PrismaClient) {
    console.log(cyan('Initializing word tables'));

    const wordProgress = new SingleBar({
        format: 'Creating word table |' + '{bar}' + '| {percentage}% || {value}/{total} Tables',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    wordProgress.start(data.entry.length, 0);

    data.entry.slice(0, 1000).forEach(async entry => {
        wordProgress.increment();

        //
        // Create 1st level word entries
        //
        const word = await prisma.word.create({
            data: {
                sequence: entry.ent_seq,
            }
        });

        //
        // Create 2nd level kanji entries
        //
        if (entry.k_ele) {

            const k_eleArr = Array.isArray(entry.k_ele) ? entry.k_ele : [entry.k_ele];

            k_eleArr.forEach(async k_ele => {

                // Get word kanji info
                const kanjiInfo: Prisma.KwWordKanjiInfoWhereUniqueInput[] = [];

                if (k_ele.ke_inf) {
                    const ke_infArr = Array.isArray(k_ele.ke_inf) ? k_ele.ke_inf : [k_ele.ke_inf];

                    for (const ke_inf of ke_infArr) {
                        const kwWordKanjiInfo = await prisma.kwWordKanjiInfo.findFirst({
                            where: {
                                value: ke_inf
                            }
                        });

                        if (kwWordKanjiInfo) {
                            kanjiInfo.push({
                                id: kwWordKanjiInfo.id
                            });
                        };
                    }
                };

                // Get word kanji prio
                const kanjiPrio: Prisma.KwWordPrioWhereUniqueInput[] = [];

                if (k_ele.ke_pri) {
                    const ke_priArr = Array.isArray(k_ele.ke_pri) ? k_ele.ke_pri : [k_ele.ke_pri];

                    for (const ke_pri of ke_priArr) {
                        const kwWordKanjiPrio = await prisma.kwWordPrio.findFirst({
                            where: {
                                value: ke_pri
                            }
                        });

                        if (kwWordKanjiPrio) {
                            kanjiPrio.push({
                                id: kwWordKanjiPrio.id
                            });
                        };
                    }
                };

                // Create word kanji element
                await prisma.word_KanjiEl.create({
                    data: {
                        word_id: word.id,
                        value: k_ele.keb,
                        info: {
                            connect: kanjiInfo
                        },
                        prio: {
                            connect: kanjiPrio
                        },
                    },
                });
            });
        }

        //
        // Create 2nd level reading entries
        //
        const r_eleArr = Array.isArray(entry.r_ele) ? entry.r_ele : [entry.r_ele];

        r_eleArr.forEach(async r_ele => {

            // Get word reading info
            const readingInfo: Prisma.KwWordReadingInfoWhereUniqueInput[] = [];

            if (r_ele.re_inf) {
                const re_infArr = Array.isArray(r_ele.re_inf) ? r_ele.re_inf : [r_ele.re_inf];

                for (const re_inf of re_infArr) {
                    const kwWordReadingInfo = await prisma.kwWordReadingInfo.findFirst({
                        where: {
                            value: re_inf
                        }
                    });

                    if (kwWordReadingInfo) {
                        readingInfo.push({
                            id: kwWordReadingInfo.id
                        });
                    };
                }
            };

            // Get word reading prio
            const readingPri: Prisma.KwWordPrioWhereUniqueInput[] = [];

            if (r_ele.re_pri) {
                const re_priArr = Array.isArray(r_ele.re_pri) ? r_ele.re_pri : [r_ele.re_pri];

                for (const re_pri of re_priArr) {
                    const kwWordReadingPri = await prisma.kwWordPrio.findFirst({
                        where: {
                            value: re_pri
                        }
                    });

                    if (kwWordReadingPri) {
                        readingPri.push({
                            id: kwWordReadingPri.id
                        });
                    };
                }
            };

            // Create word reading element
            await prisma.word_ReadingEl.create({
                data: {
                    word_id: word.id,
                    value: r_ele.reb,
                    nokanji: r_ele.re_nokanji ? true : false,
                    info: {
                        connect: readingInfo
                    },
                    prio: {
                        connect: readingPri
                    },
                }
            });
        });

        //
        // Create 2nd level sense entries
        //
        const senseArr = Array.isArray(entry.sense) ? entry.sense : [entry.sense];

        senseArr.forEach(async sense => {

            // Get sense dialect
            const senseDial: Prisma.KwDialWhereUniqueInput[] = [];

            if (sense.dial) {
                const dialArr = Array.isArray(sense.dial) ? sense.dial : [sense.dial];

                for (const dial of dialArr) {
                    const kwDial = await prisma.kwDial.findFirst({
                        where: {
                            value: dial
                        }
                    });

                    if (kwDial) {
                        senseDial.push({
                            id: kwDial.id
                        });
                    };
                }
            };

            // Get sense field
            const senseField: Prisma.KwWordFieldWhereUniqueInput[] = [];

            if (sense.field) {
                const fieldArr = Array.isArray(sense.field) ? sense.field : [sense.field];

                for (const field of fieldArr) {
                    const kwField = await prisma.kwWordField.findFirst({
                        where: {
                            value: field
                        }
                    });

                    if (kwField) {
                        senseField.push({
                            id: kwField.id
                        });
                    };
                }
            };

            // Get sense misc
            const senseMisc: Prisma.KwWordMiscWhereUniqueInput[] = [];

            if (sense.misc) {
                const miscArr = Array.isArray(sense.misc) ? sense.misc : [sense.misc];

                for (const misc of miscArr) {
                    const kwMisc = await prisma.kwWordMisc.findFirst({
                        where: {
                            value: misc
                        }
                    });

                    if (kwMisc) {
                        senseMisc.push({
                            id: kwMisc.id
                        });
                    };
                }
            };

            // Get sense pos
            const sensePos: Prisma.KwWordPosWhereUniqueInput[] = [];

            if (sense.pos) {
                const posArr = Array.isArray(sense.pos) ? sense.pos : [sense.pos];

                for (const pos of posArr) {
                    const kwPos = await prisma.kwWordPos.findFirst({
                        where: {
                            value: pos
                        }
                    });

                    if (kwPos) {
                        sensePos.push({
                            id: kwPos.id
                        });
                    };
                }
            };

            // Create word reading element
            await prisma.word_Sense.create({
                data: {
                    word_id: word.id,
                    info: sense.s_inf ? sense.s_inf : null,
                    dial: {
                        connect: senseDial
                    },
                    field: {
                        connect: senseField
                    },
                    misc: {
                        connect: senseMisc
                    },
                    position: {
                        connect: sensePos
                    }
                }
            });
        });
    });

    wordProgress.stop();
}
