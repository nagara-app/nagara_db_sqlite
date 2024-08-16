import download from './download';

export const main = async (): Promise<void> => {
  await download();
};

void main();
