// const request = require('supertest');
// const app = require('./app');
// const chai = require('chai');
// const expect = chai.expect;

// describe('GET /producto/:id', () => {
//     it('returns a JSON object with specific keys and values', (done) => {
//         request(app)
//             .get('/animals/1')
//             .expect('Content-Type', /json/)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 const expectedKeys = ['_id', 'name', 'price', 'photo'];
//                 //const expectedValues = [1, 'Lion', 'Panthera leo', 'Savannah', 'Carnivore'];
//                 expect(Object.keys(res.body)).to.have.members(expectedKeys);
//                 //expect(Object.values(res.body)).to.have.members(expectedValues);
//                 done();
//             });
//     });
// });


const request = require('supertest');
const { server } = require('../serverDeTest.js');
const chai = require('chai');
const expect = chai.expect;

describe('GET /api/productos', () => {
    it('returns an array of objects with different keys', (done) => {
        request(server)
            .get('/api/productos')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                // for (let i = 0; i < res.body.length; i++) {
                //     expect(res.body[i]).to.be.an('object');
                //     expect(res.body[i]).to.include.all.keys('_id', 'name', 'price', 'photo');
                // }
                done();
            });
    });
});

// describe('POST /api/productos', () => {
//     it('creates a new product', (done) => {
//         const newProduct = { _id: 1234, name: 'John Doe', price: 125, photo: 'john.doe@example.com' };

//         request(app)
//             .post('/api/productos')
//             .send(newProduct)
//             .expect('Content-Type', /json/)
//             .expect(201)
//             .end((err, res) => {
//                 if (err) return done(err);

//                 const { _id, name, price, photo } = res.body;

//                 expect(_id).to.be.a('string');
//                 expect(_id).to.equal(newProduct._id);
//                 expect(name).to.equal(newProduct.name);
//                 expect(price).to.equal(newProduct.price);
//                 expect(photo).to.equal(newProduct.photo);

//                 done();
//             });
//     });
// });