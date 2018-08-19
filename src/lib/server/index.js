import { range } from 'lodash';
import squareSums from './square-sums';
import sumSquares from './sum-squares';

let occurrences = 0,
  lastDatetime = null;

/**
 * mocked server-side POST handler, extremely simplified
 * @param  {string} request stringified json
 * @return {Promise}
 */
export function post(request) {
  return new Promise((resolve, reject) => {
    const datetime = new Date(),
      // note: updating the occurence count and last_datetime here
      // so they're updated on both successful and unsuccessful calls
      resultObj = {
        datetime,
        last_datetime: lastDatetime
      };

    // count the number of times this has been called
    occurrences++;
    resultObj.occurrences = occurrences;

    // update the last datetime with the new timestamp
    lastDatetime = datetime;

    try {
      const reqObj = JSON.parse(request),
        number = reqObj.value,
        numbers = range(1, number + 1),
        diff = squareSums(numbers) - sumSquares(numbers);

      // number of numbers to calculate
      resultObj.number = number;

      // result value
      resultObj.value = diff;

      // pass back stringified JSON to mimic the result of an api call
      resolve(JSON.stringify(resultObj));
    } catch (e) {
      // just reject with the error
      reject(e);
    }
  });
}

// for testing
export function resetCount() {
  occurrences = 0;
  lastDatetime = null;
}

export function getCount() {
  return occurrences;
}
