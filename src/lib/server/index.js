import { range } from 'lodash';
import squareSums from './square-sums';
import sumSquares from './sum-squares';

/**
 * mocked server-side POST handler, extremely simplified
 * @param  {string} request stringified json
 * @return {Promise}
 */
export function post(request) {
  return new Promise((resolve, reject) => {
    try {
      const reqObj = JSON.parse(request),
        number = reqObj.number,
        numbers = range(1, number + 1),
        diff = squareSums(numbers) - sumSquares(numbers);

      // pass back stringified JSON to mimic the result of an api call
      resolve(JSON.stringify({
        datetime: reqObj.datetime,
        value: diff,
        number,
        occurrences: reqObj.occurrences,
        last_datetime: reqObj.last_datetime
      }));
    } catch (e) {
      // just reject with the error
      reject(e);
    }
  });
}
