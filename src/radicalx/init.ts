import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { Radicalx, RadicalxVariant } from './model';
import { RadKFileX } from '../radkfilex/model';
import { KRadFileX } from '../kradfilex/model';
import { Radical, Radvar } from '../kanjium/model';

const radkxPath = join(__dirname, '..', '..', 'output/radkfilex.json');
const radkxFile = readFileSync(radkxPath);
const radkxData = JSON.parse(radkxFile.toString()) as RadKFileX;

const kradxPath = join(__dirname, '..', '..', 'output/kradfilex.json');
const kradxFile = readFileSync(kradxPath);
const kradxData = JSON.parse(kradxFile.toString()) as KRadFileX;

const radicalsPath = join(__dirname, '..', '..', 'input/radicals.json');
const radicalsFile = readFileSync(radicalsPath);
const radicalsData = JSON.parse(radicalsFile.toString()) as Radical[];

const radvarsPath = join(__dirname, '..', '..', 'input/radvars.json');
const radvarsFile = readFileSync(radvarsPath);
const radvarsData = JSON.parse(radvarsFile.toString()) as Radvar[];

const outputFilePath = join(__dirname, '..', '..', 'output/radicalx.json');

// Radicals that don't map with radkx
const kanjinumRadKXmap: { [key: string]: string; } = {
    "丨": "｜",
    "丿": "ノ",
    "亻": "化",
    "𠆢": "个",
    "八": "ハ",
    "䒑": "并",
    "刂": "刈",
    "辶": "込",
    "⺌": "尚",
    "巳": "已",
    "彐": "ヨ",
    "忄": "忙",
    "扌": "扎",
    "氵": "汁",
    "犭": "犯",
    "艹": "艾",
    "⻏": "邦",
    "⻖": "阡",
    "匸": "亡", // Looks correcter: 亡
    "灬": "杰",
    "礻": "礼",
    "尢": "尤", // Looks correcter: 尤
    "疒": "疔",
    "禸": "禹",
    "衤": "初",
    "罒": "買",
    "黑": "黒",
}

// Radicals that are not part of kanjium
const kanjinumNonExistingVersions: { [key: string]: Array<RadicalxVariant>; } = {
    "口": [{
        literal: "品", // radical #30
        _literal: "品",
        stroke_count: 9,
    }],
    "无": [{
        literal: "無", // radical #71
        _literal: "無",
        stroke_count: 12,
    }]
}


const radkXcomponent = {
    "マ": "龴",
}

const radkXkanji = {
    "九": "k",
    "ユ": "k",
    "乃": "k",
    "乞": "乞",
    "也": "也",
    "及": "及",
    "久": "久",
    "元": "元",
    "井": "井",
    "勿": "勿",
    "五": "五",
    "屯": "屯",
    "巴": "巴",
    "世": "世",
    "巨": "巨",
    "冊": "冊",
    "奄": "奄",
    "岡": "岡",
    "免": "免",
    "滴": "謫",
}

const radicalx: Radicalx[] = [];

for (const radical of radicalsData) {
    let _literal;
    _literal = radkxData.entries.find(a => a.radical === radical.radical)?.radical;
    _literal = _literal !== undefined ? _literal : kanjinumRadKXmap[radical.radical];

    const nonExistingVersion = kanjinumNonExistingVersions[radical.radical];

    radicalx.push({
        number: radical.number,
        literal: radical.radical,
        _literal: _literal,
        stroke_count: radical.strokes,
        reading: radical.names.split("・"),
        meaning: radical.meaning.split(", "),
        notes: radical.notes ? radical.notes : undefined,
        variant: nonExistingVersion ? nonExistingVersion : [],
    });
}


for (const radvar of radvarsData) {
    let _literal;
    _literal = radkxData.entries.find(a => a.radical === radvar.radvar)?.radical;
    _literal = _literal !== undefined ? _literal : kanjinumRadKXmap[radvar.radvar];

    const i = radicalx.findIndex(a => a.literal === radvar.radical);

    radicalx[i].variant.push({
        literal: radvar.radvar,
        _literal: _literal,
        stroke_count: radvar.strokes
    });
}

writeFileSync(outputFilePath, JSON.stringify(radicalx, null, 2));