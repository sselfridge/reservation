const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3001';

describe('/queue', () => {
  describe('GET', () => {
    // Note that we return the evaluation of `request` here! It evaluates to
    // a promise, so Jest knows not to say this test passes until that
    // promise resolves. See https://jestjs.io/docs/en/asynchronous
    it('responds with 200 status and application/json content type', () =>
      request(server)
        .get('/queue')
        .expect('Content-Type', /application\/json/)
        .expect(200));

    it('responds with a empty array', () =>
      request(server)
        .get('/queue')
        .expect(res => {
          expect(res.body).toEqual([]);
        }));
  });
});

describe('/queue/push', () => {
  describe('POST', () => {
    it('responds with one item in the queue when added', () =>
      request(server)
        .post('/queue/push/timmy')
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual(['timmy']);
        }));
    it('Adds a second item after the first', () =>
      request(server)
        .post('/queue/push/bob')
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual(['timmy', 'bob']);
        }));
    it('Wont add the same user to the queue', () =>
      request(server)
        .post('/queue/push/bob')
        .expect(444));
  });
});
