import { send, resetCount, getCount } from './api';

describe('server post', () => {
  beforeEach(() => {
    resetCount(); // reset the count and timestamp
  });

  it('updates the count on uncached api calls', () => {
    expect(getCount()).toBe(0);
    return send(10)
      .then((res) => expect(res.occurrences).toBe(1));
  });

  it('does not update the count on cached api calls', () => {
    expect(getCount()).toBe(0);

    return send(10)
      .then(() => send(10))
      .then((res) => expect(res.occurrences).toBe(1));
  });

  it('matches initial spec doc (1-10)', () => {
    return send(10)
      .then((res) => expect(res.result).toBe(2640))
  })
});
