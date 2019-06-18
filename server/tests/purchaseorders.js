import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();
const token = process.env.jwtPrivateKey;
const fakeToken = process.env.INVALID_TOKEN;

describe('Cars advert', () => {
  it('should get all car adverts', (done) => {
    chai.request(server).get('/api/v2/orders').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('all orders retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
  it('should not get all car adverts', (done) => {
    chai.request(server).get('/api/v2/orders').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not get all car adverts', (done) => {
    chai.request(server).get('/api/v2/orders').set('x-auth-token', fakeToken).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
