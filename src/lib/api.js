import { memoize } from 'lodash';
import { compareAsc } from 'date-fns';
import { post } from './server';

const postToServer = memoize(post);

let occurrences = 0,
  lastDatetime = null;

/**
 * send a value to our fake server,
 * memoize the results
 * @param  {Number} value the amount of natural numbers to calculate on
 * @return {Promise}
 */
export function send(value) {
  return postToServer(value)
    .then(JSON.parse)
    .then((res) => {
      // update the number of times we've actually called the server
      occurrences = res.occurrences > occurrences ? res.occurrences : occurrences;
      // update the last time we actually called the server
      lastDatetime = res.last_datetime && compareAsc(res.last_datetime, lastDatetime) === 1 ? res.last_datetime : lastDatetime;

      return {
        result: res.value,
        occurrences,
        lastDatetime
      }
    }); // note: errors are caught in App.js
}
