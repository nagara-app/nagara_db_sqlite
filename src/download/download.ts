import AdmZip from 'adm-zip';
import { basename, extname } from 'path';
import { gunzip } from 'zlib';
import { codeToString, convert } from 'encoding-japanese';
import { http, https } from 'follow-redirects';
import { writeFile } from 'fs/promises';

import type { FileDownload, ZipDownload, ZipDownloadTarget } from 'src/config';
import type { Encoding } from 'encoding-japanese';
import type { IncomingMessage } from 'http';

import { MultiBar, Presets } from 'cli-progress';
import type { Options } from 'cli-progress';

import chalk from 'chalk';

import config from 'src/config';

const progressBarOptions: Options = {
  hideCursor: true,
  format: '{bar} {percentage}% | {filename} | {value}/{total} bytes',
};

const multibar = new MultiBar(progressBarOptions, Presets.shades_classic);

export default async (): Promise<void> => {
  const downloadPromises: Array<Promise<void>> = [];

  for (const download of config.downloads) {
    downloadPromises.push(downloadFile(download));
  }

  for (const zipDownload of config.zipDownloads) {
    downloadPromises.push(downloadZipFile(zipDownload));
  }

  console.log('Downloading files …');

  await Promise.all(downloadPromises);

  multibar.stop();

  console.log(chalk.green('All files downloaded'));
};

const downloadFile = async (download: FileDownload): Promise<void> => {
  const url = download.url;
  const from = download.from;
  const to = download.to;

  const filename = basename(url);
  const fileExtension = extname(filename);

  let file: Buffer = await getFile(url);

  if (fileExtension === '.gz') {
    file = await gunzipFile(file);
  }

  if (from !== undefined && to !== undefined) {
    file = encodeFile(file, from, to);
  }

  await writeFile(download.path, file);
};

const downloadZipFile = async (download: ZipDownload): Promise<void> => {
  const url = download.url;
  const zipTargets = download.targets;

  const file = await getFile(url);
  const zipFiles = await unzipFile(file, zipTargets);

  for (const zipFile of zipFiles) {
    const from = zipFile.from;
    const to = zipFile.to;

    const fileExtension = extname(zipFile.target);

    let data = zipFile.data;

    if (from !== undefined && to !== undefined) {
      data = encodeFile(data, from, to);
    }

    if (fileExtension === '.json') {
      data = parseJson(data);
    }

    await writeFile(zipFile.path, data);
  }
};

const getFile = async (url: string): Promise<Buffer> => {
  const parsedUrl = new URL(url);
  const protocol = parsedUrl.protocol;
  const filename = basename(url);

  return await new Promise<Buffer>((resolve, reject) => {
    const handleResponse = (response: IncomingMessage): void => {
      const chunks: Buffer[] = [];
      const total = parseInt(response.headers['content-length'] ?? '0', 10);

      const progressBar = multibar.create(total, 0);

      response.on('data', (chunk) => {
        chunks.push(chunk);
        progressBar.increment(chunk.length, { filename });
      });

      response.on('end', () => {
        resolve(Buffer.concat(chunks));
        progressBar.stop();
      });

      response.on('error', (err) => {
        reject(err);
      });
    };

    if (protocol === 'http:') {
      http.get(url, handleResponse).on('error', reject);
    } else if (protocol === 'https:') {
      https.get(url, handleResponse).on('error', reject);
    } else {
      reject(new Error('Unknown protocol of URL'));
    }
  });
};

const encodeFile = (data: Buffer, from: Encoding, to: Encoding): Buffer => {
  const convertedData = convert(data, {
    to,
    from,
  });

  const encodedData = codeToString(convertedData);
  const buffer = Buffer.from(encodedData);
  return buffer;
};

interface UnzipResponse extends ZipDownloadTarget {
  data: Buffer;
}

const unzipFile = async (zipFile: Buffer, zipTargets: ZipDownloadTarget[]): Promise<UnzipResponse[]> => {
  return await new Promise<UnzipResponse[]>((resolve, reject) => {
    try {
      const files: UnzipResponse[] = [];

      const zip = new AdmZip(zipFile);
      const zipEntries = zip.getEntries();

      for (const zipEntry of zipEntries) {
        const zipTarget = zipTargets.find((a) => a.target === zipEntry.entryName);
        if (zipTarget === undefined) {
          continue;
        }
        const data: Buffer = zipEntry.getData();
        files.push({ ...zipTarget, data });
      }
      resolve(files);
    } catch (err) {
      reject(err);
    }
  });
};

const gunzipFile = async (compressedFile: Buffer): Promise<Buffer> => {
  return await new Promise<Buffer>((resolve, reject) => {
    gunzip(compressedFile, (err, result) => {
      if (err !== null) {
        reject(err);
      }

      resolve(result);
    });
  });
};

const parseJson = (data: Buffer): Buffer => {
  const stringData = data.toString();
  const trimmedData = stringData.trim();
  const parsedJson = JSON.parse(trimmedData);
  const prettyJsonString = JSON.stringify(parsedJson, null, 2);
  const jsonBuffer = Buffer.from(prettyJsonString);
  return jsonBuffer;
};
