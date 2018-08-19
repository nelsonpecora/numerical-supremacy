import { range } from 'lodash';
import sumSquares from './sum-squares';

describe('sumSquares', () => {
  it('throws an error if arg is not an array of numbers', () => {
    expect(() => sumSquares(['1', '2', '3'])).toThrow('Cannot sum the squares of non-numbers!');
  });

  it('returns the sum of the squares of each number', () => {
    expect(sumSquares([1, 2, 3, 4])).toBe(30);
  });

  it('matches initial spec doc (1-10)', () => {
    expect(sumSquares(range(1, 11))).toBe(385);
  });
});
