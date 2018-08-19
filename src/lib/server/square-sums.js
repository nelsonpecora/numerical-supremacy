import { some, isNumber, reduce } from 'lodash';

/**
 * return the square of the sum of all numbers in the array
 * @param  {array} numbers e.g. [1, 2, 3, 4]
 * @return {number}
 */
export default function (numbers) {
  if (some(numbers, (number) => !isNumber(number))) {
    throw new Error('Cannot square the sum of non-numbers!');
  }

  return Math.pow(reduce(numbers, (sum, number) => sum + number, 0), 2);
}
