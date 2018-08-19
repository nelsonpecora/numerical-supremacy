import { post } from './server';

let occurrences = 0,
  lastDatetime = null,
  dateTime = null,
  cache = {},
  apiResponses = [];

/**
 * memoize our call to the server manually, updating the occurrences and timestamp
 * @param  {number} value
 * @return {Promise}
 */
function postToServer(value) {
  if (cache[value]) {
    return Promise.resolve({ value: cache[value], api: null });
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
      occurrences,
      last_datetime: lastDatetime
    }))
      .then(JSON.parse)
      .then((res) => {
        // cache the value
        cache[value] = res.value;
        // return the value and api response
        return { value: res.value, api: res };
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
    .then((result) => {
      if (result.api) {
        // if we got a response from the api, add it to the list
        apiResponses.push(result.api);
      }

      return {
        result: result.value,
        occurrences,
        lastDatetime,
        apiResponses
      };
    }); // note: errors are caught in App.js
}

// for testing
export function resetCount() {
  occurrences = 0;
  cache = {};
}

export function getCount() {
  return occurrences;
}
