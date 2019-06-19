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

describe('Cars orders', () => {
  it('should get all car orders', (done) => {
    chai.request(server).get('/api/v2/orders').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('all orders retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
  it('should not get all car orders', (done) => {
    chai.request(server).get('/api/v2/orders').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not get all car orders', (done) => {
    chai.request(server).get('/api/v2/orders').set('x-auth-token', fakeToken).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
describe('car Orders', () => {
  it('should  not get all car orders', (done) => {
    chai.request(server).get('/api/v2/orders').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should  not get all car orders', (done) => {
    chai.request(server).get('/api/v2/orders').set('x-auth-token', fakeToken).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
describe('car Orders', () => {
  it('should  not update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').send({
      amount: '4000'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should  not update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').set('x-auth-token', fakeToken)
      .send({
        amount: '400'
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid token');
        done();
      });
  });
});
