import AdmZip from 'adm-zip';
import path from 'path';
import { parse } from 'node-html-parser';
import type { HTMLElement } from 'node-html-parser';
import type { KanjiVG, KanjiVGComponents, KanjiVGStroke } from './kanjivg.dto';
import { writeFileToInputConverted } from '../../utils';
import { CONSTANTS } from '../../constants';

export default async (): Promise<void> => {
  // Unpack the kanjivg zip file
  console.log(`Reading ${CONSTANTS.fileNames.kanjivg} file from input …`);
  const zip = new AdmZip(
    path.join(__dirname, '..', '..', '..', `${CONSTANTS.inputDir}/${CONSTANTS.fileNames.kanjivg}`),
  );

  // Loop through all the files in the zip with an svg extension
  const svgFiles = zip.getEntries().filter((entry) => entry.entryName.endsWith(CONSTANTS.kanjivgExtension));

  // Create an array to store the kanjiVG objects
  const kanjiVG: KanjiVG[] = [];

  svgFiles.forEach((entry) => {
    // Get the file name and strip the extension and directory
    const hexcode = entry.entryName.replace(CONSTANTS.kanjivgExtension, '').split('/').pop();

    // Skip if the filename cannot be parsed
    if (hexcode === undefined) return;

    // Get the file data
    const data = entry.getData().toString('utf8');

    // Create a DOM tree from the data
    const dom = parse(data);

    const literalElement = dom.querySelector(`#kvg\\:${hexcode}`);
    const literal = literalElement?.getAttribute('kvg:element');

    // Skip if the literal value cannot be parsed
    if (literal === undefined) return;

    // Create an array to store the components
    const compGroup = iterate(literalElement);

    // Create an array to store the strokes
    const strokes: KanjiVGStroke[] = [];

    // Loop through all the strokes
    let i = 1;
    while (true) {
      // Get the path data from the element with id
      const pathElement = dom.querySelector(`#kvg\\:${hexcode}-s${i}`);
      const path = pathElement?.getAttribute('d') ?? undefined;

      // Get the string value from the path variable where the string is between the first M character and first c or C
      const pathBeginning = path?.match(/[Mm](.*?)[Cc]/)?.[1];

      // Separate the x and y values from pathBeginning by a comma
      const x = pathBeginning?.split(',')[0] ?? undefined;
      const y = pathBeginning?.split(',')[1] ?? undefined;

      // If path, x or y is undefined or not a double, the loop should break
      if (path === undefined || x === undefined || y === undefined) break;

      strokes.push({
        path,
        x,
        y,
      });
      i++;
    }

    // Create the kanjiVG object
    kanjiVG.push({
      literal,
      hexcode,
      strokes,
      compGroup,
    });
  });

  // Write the kanjiVG object to a file
  await writeFileToInputConverted(CONSTANTS.fileNames.kanjivgConverted, kanjiVG);
};

// KanjiVGComponents[]
const iterate = (obj: HTMLElement | null): KanjiVGComponents[] => {
  let components: KanjiVGComponents[] = [];
  const elStack = obj?.querySelectorAll(':scope > g') ?? [];

  for (const el of elStack) {
    const kanjiEl = el.getAttribute('kvg:element');

    if (kanjiEl !== undefined) {
      const comp = iterate(el);

      if (comp.length > 0) {
        components.push({
          el: kanjiEl,
          comp,
        });
      } else {
        components.push({
          el: kanjiEl,
        });
      }
    } else {
      components = components.concat(iterate(el));
    }
  }

  return components;
};
