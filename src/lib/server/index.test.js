import { post } from './';

describe('server post', () => {
  it('rejects with an error if passed incorrect data', () => {
    return post(JSON.stringify({ number: '10' })).catch((e) => {
      expect(e.message).toBe('Cannot square the sum of non-numbers!');
    });
  });

  it('matches initial spec doc (1-10)', () => {
    return post(JSON.stringify({ number: 10 }))
      .then(JSON.parse)
      .then((res) => {
        expect(res.value).toBe(2640);
      })
  })
});
