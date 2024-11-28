import {toHash} from './utils';

describe('Return expected hash', () => {
  test('Return expected hash for word', () => {
    const result = toHash('what');
    const expected = 'e0bafcc0';
    expect(result).toBe(expected);
  });

  test('Return expected hash for form', () => {
    const result = toHash('何に');
    const expected = '5cc8db68';
    expect(result).toBe(expected);
  });
});
