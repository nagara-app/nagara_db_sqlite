import {createReadStream, createWriteStream, statSync} from 'fs';

import type {MultiBar} from 'cli-progress';
import {pipeline} from 'stream';

export const readFileWithProgress = async (
  path: string,
  multibar: MultiBar
): Promise<Buffer> => {
  return await new Promise<Buffer>((resolve, reject) => {
    try {
      const readStream = createReadStream(path);

      const stats = statSync(path);
      const total = stats.size;

      const progressbar = multibar.create(total, 0, {filename: path});

      const chunks: Buffer[] = [];

      readStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
        progressbar.increment(chunk.length);
      });

      readStream.on('end', () => {
        const file = Buffer.concat(chunks);
        progressbar.stop();
        resolve(file);
      });

      readStream.on('error', err => {
        progressbar.stop();
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const writeFileWithProgress = async (
  file: Buffer,
  path: string,
  multibar: MultiBar
): Promise<Buffer> => {
  return await new Promise<Buffer>((resolve, reject) => {
    try {
      const writeStream = createWriteStream(path);

      const total = file.byteLength;

      pipeline(file, writeStream);

      const progressbar = multibar.create(total, 0, {filename: path});

      const chunks: Buffer[] = [];

      writeStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
        progressbar.increment(chunk.length);
      });

      writeStream.on('end', () => {
        const file = Buffer.concat(chunks);
        progressbar.stop();
        resolve(file);
      });

      writeStream.on('error', err => {
        progressbar.stop();
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const toCamelcaseFromSnakecase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/(_\w)/g, m => m.toUpperCase().substring(1));
};

export const toCamelcaseFromKebabcase = (text: string): string => {
  return (
    text.charAt(0).toLowerCase() +
    text.slice(1).replace(/-./g, x => {
      if (x[1] !== undefined) {
        return x[1].toUpperCase();
      } else {
        return '';
      }
    })
  );
};
