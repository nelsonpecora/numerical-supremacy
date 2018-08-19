import { post, resetCount, getCount } from './';

describe('server post', () => {
  beforeEach(() => {
    resetCount(); // reset the count and timestamp
  })

  it('rejects with an error if passed incorrect data', () => {
    return post('10').catch((e) => {
      expect(e.message).toBe('Cannot square the sum of non-numbers!');
    });
  });

  it('updates the count on successful requests', () => {
    expect(getCount()).toBe(0);
    return post(10)
      .then(JSON.parse)
      .then((res) => {
        expect(res.occurrences).toBe(1);
        expect(getCount()).toBe(1);
      });
  });

  it('updates the count on unsuccessful requests', () => {
    expect(getCount()).toBe(0);
    return post('10')
      .catch(() => {
        expect(getCount()).toBe(1);
      });
  });

  it('matches initial spec doc (1-10)', () => {
    return post(10)
      .then(JSON.parse)
      .then((res) => {
        expect(res.value).toBe(2640);
      })
  })
});
