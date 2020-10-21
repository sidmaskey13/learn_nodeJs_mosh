const { request } = require('express');
const require = require('supertest');

describe('auth middleware', () => {
    beforeEach(() => { server = require('../..'); })
    afterEach(async () => { 
    server.close(); 
  });
    const exec = () => {
        request(server).post('/api/genres').send({})
    }
    
})
