import { post } from './server';

let occurrences = 0,
  lastDatetime = null,
  dateTime = null,
  cache = {};

/**
 * memoize our call to the server manually, updating the occurrences and timestamp
 * @param  {number} value
 * @return {Promise}
 */
function postToServer(value) {
  if (cache[value]) {
    return Promise.resolve(cache[value]);
  } else {
    // actual api call to the server, update the occurrences and timestamp
    // update the number of times we've actually called the server
    occurrences++;
    // update the last time we actually called the server
    lastDatetime = dateTime;
    dateTime = new Date();

    // stringifying beause we're pretending like we're sending JSON to the server
    return post(JSON.stringify({
      number: value,
      datetime: dateTime,
      last_datetime: lastDatetime
    }))
      .then(JSON.parse)
      .then((res) => {
        // cache the value
        cache[value] = res.value;
        return res.value;
      });
  }
}

/**
 * send a value to our fake server,
 * memoize the results
 * @param  {number} value the amount of natural numbers to calculate on
 * @return {Promise}
 */
export function send(value) {
  return postToServer(value)
    .then((result) => ({
      result,
      occurrences,
      lastDatetime
    })); // note: errors are caught in App.js
}

// for testing
export function resetCount() {
  occurrences = 0;
  cache = {};
}

export function getCount() {
  return occurrences;
}
