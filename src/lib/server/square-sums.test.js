import { range } from 'lodash';
import squareSums from './square-sums';

describe('squareSums', () => {
  it('throws an error if arg is not an array of numbers', () => {
    expect(() => squareSums(['1', '2', '3'])).toThrow('Cannot square the sum of non-numbers!');
  });

  it('returns the square of the num of all numbers', () => {
    expect(squareSums([1, 2, 3, 4])).toBe(100);
  });

  it('matches initial spec doc (1-10)', () => {
    expect(squareSums(range(1, 11))).toBe(3025);
  });
});
