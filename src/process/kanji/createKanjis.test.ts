import { extractXYfromPath } from 'src/process/kanji/createKanjis';

describe('Extracter is returning correct X and Y from path', () => {
  test('regular path', () => {
    const path =
      'M23.38,21.68c2.99,0.65,5.98,0.58,9.01,0.33c13.11-1.04,30.12-2.73,45.99-3.15c2.81-0.07,5.73-0.07,8.5,0.53';

    const result = extractXYfromPath(path);
    const expected = { x: '23.38', y: '21.68' };
    expect(result).toEqual(expected);
  });

  test('path with uppercase characters', () => {
    const path = 'M20,43.14C1.19,0.96,1.48,1.7,1.82,3.1c1.31,5.39,2.44,12.96,3.43,19.51c0.3,2,0.57,3.56,0.81,5';

    const result = extractXYfromPath(path);
    const expected = { x: '20', y: '43.14' };
    expect(result).toEqual(expected);
  });

  test('path with white spaces', () => {
    const path = 'M 33.825625,13.64 c 0.06,0.64 0.27,1.71 -0.11,2.57 -2.44,5.65 -9.46,16.71 -19.41,25.04';

    const result = extractXYfromPath(path);
    const expected = { x: '33.825625', y: '13.64' };
    expect(result).toEqual(expected);
  });
});
