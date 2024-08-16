// http://ftp.usf.edu/pub/ftp.monash.edu.au/pub/nihongo/

import type { Encoding } from 'encoding-japanese';

export interface Config {
  downloads: FileDownload[];
  zipDownloads: ZipDownload[];
}

export interface FileDownload {
  url: string;
  path: string;
  from?: Encoding;
  to?: Encoding;
}

export interface ZipDownload {
  url: string;
  targets: ZipDownloadTarget[];
}

export interface ZipDownloadTarget {
  target: string;
  path: string;
  from?: Encoding;
  to?: Encoding;
}

const downloadPath = 'input/download/';

export default {
  downloads: [
    {
      url: 'http://ftp.usf.edu/pub/ftp.monash.edu.au/pub/nihongo/JMdict.gz',
      path: `${downloadPath}jmdict.xml`,
    },
    {
      url: 'http://ftp.usf.edu/pub/ftp.monash.edu.au/pub/nihongo/kanjidic2.xml.gz',
      path: `${downloadPath}kanjidic2.xml`,
    },
    {
      url: 'https://github.com/KanjiVG/kanjivg/releases/latest/download/kanjivg-20240807.xml.gz',
      path: `${downloadPath}kanjivg.xml`,
    },
    {
      url: 'http://ftp.edrdg.org/pub/Nihongo/wordfreq_ck.gz',
      path: `${downloadPath}wordfreq_ck.txt`,
      from: 'EUCJP',
      to: 'UNICODE',
    },
  ],
  zipDownloads: [
    {
      url: 'http://ftp.usf.edu/pub/ftp.monash.edu.au/pub/nihongo/kradzip.zip',
      targets: [
        { target: 'radkfilex', path: `${downloadPath}radkfilex.txt`, from: 'EUCJP', to: 'UNICODE' },
        { target: 'kradfile', path: `${downloadPath}kradfile.txt`, from: 'EUCJP', to: 'UNICODE' },
        { target: 'kradfile2', path: `${downloadPath}kradfile2.txt`, from: 'EUCJP', to: 'UNICODE' },
      ],
    },
    {
      url: 'https://github.com/Doublevil/JmdictFurigana/releases/latest/download/JmdictFurigana.json.zip',
      targets: [{ target: 'JmdictFurigana.json', path: `${downloadPath}jmdict_furigana.json` }],
    },
  ],
} satisfies Config;
