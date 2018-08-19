import { some, isNumber, reduce } from 'lodash';

/**
 * return the sum of the squares of all numbers in the array
 * @param  {array} numbers e.g. [1, 2, 3, 4]
 * @return {number}
 */
export default function (numbers) {
  if (some(numbers, (number) => !isNumber(number))) {
    throw new Error('Cannot sum the squares of non-numbers!');
  }

  return reduce(numbers, (sum, number) => sum + Math.pow(number, 2), 0);
}
