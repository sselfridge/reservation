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
  });

  it('responds with a empty array', () =>
    request(server)
      .get('/queue')
      .expect(res => {
        expect(res.body).arrayContaining([]);
      }));
});
