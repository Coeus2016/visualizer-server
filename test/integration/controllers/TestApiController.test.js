'use strict'

var request = require('supertest');

describe('TestApiController', function() {

  describe('#login()', function() {
    it('should redirect to /mypage', function (done) {
      request(sails.hooks.http.app)
        .get('/test')
        .send({ name: 'test', password: 'test' })
        .expect(200)
        .expect('location','/mypage', done);
    });
  });

});