const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

describe('GET /api/productos', () => {
    it('responds with array of products', async (done) => {
        const response = await request.get('/api/productos');
        const products = response.body;
        
    });
});