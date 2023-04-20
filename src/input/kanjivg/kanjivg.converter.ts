import AdmZip from 'adm-zip';
import path from 'path';
import { parse } from 'node-html-parser';
import type { KanjiVG, KanjiVGStroke } from './kanjivg.dto';
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
    const fileName = entry.entryName.replace(CONSTANTS.kanjivgExtension, '').split('/').pop();

    // If the file exists, finde the element with id kvg:0f9a8-s1 and get the attribute value of the attribute d
    if (fileName !== undefined) {
      // Get the file data
      const data = entry.getData().toString('utf8');

      // Create a DOM tree from the data
      const dom = parse(data);

      // Create an array to store the strokes
      const strokes: KanjiVGStroke[] = [];

      // Loop through all the strokes
      let i = 1;
      while (true) {
        // Get the path data from the element with id
        const pathElement = dom.querySelector(`#kvg\\:${fileName}-s${i}`);
        const path = pathElement?.getAttribute('d') ?? undefined;

        // Get the string from path between the first M and first c letter
        const pathBeginning = path?.substring(path.indexOf('M') + 1, path.indexOf('c')) ?? undefined;

        // Separate the x and y values from pathBeginning by a comma
        const x = pathBeginning?.split(',')[0] ?? undefined;
        const y = pathBeginning?.split(',')[1] ?? undefined;

        // If path, x or y is undefined, or if i is over 100 break the loop
        if (path === undefined || x === undefined || y === undefined) {
          break;
        } else {
          strokes.push({
            path,
            x,
            y,
          });
          i++;
        }
      }

      // Create the kanjiVG object
      kanjiVG.push({
        kanjiHexcode: fileName,
        strokes,
      });
    }
  });

  // Write the kanjiVG object to a file
  await writeFileToInputConverted(CONSTANTS.fileNames.kanjivgConverted, kanjiVG);
};
