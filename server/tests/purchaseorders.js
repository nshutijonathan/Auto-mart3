import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();
const date = new Date();
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
  it('should  not update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').set('x-auth-token', token)
      .send({
        amount: 'qwwee'
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid amount syntax');
        done();
      });
  });
  it('should  not update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').set('x-auth-token', token)
      .send({
        amount: ''
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid amount syntax');
        done();
      });
  });
  it('should  not update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').set('x-auth-token', token)
      .send({
        amount: '-4'
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid amount');
        done();
      });
  });
  it('should   update purchasing order', (done) => {
    chai.request(server).patch('/api/v2/11/price').set('x-auth-token', token)
      .send({
        amount: '6000'
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('Cars orders', () => {
  it('should not create purchasing order', (done) => {
    const payload = {
      id: 1,
      email: 'alice@gmail.com',
      user_type: 'buyer',
      is_admin: 'true'
    };
    const payloadToken = jwt.sign(payload, process.env.tokens);
    chai.request(server).post('/api/v2/order').set('x-auth-token', payloadToken).send({
      car_id: 1,
      amount: '4000'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid token');
        done();
      });
  });
  it('should  not create purchasing order', (done) => {
    const payload = {
      id: '1',
      email: 'alice@gmail.com',
      user_type: 'buyer',
      is_admin: 'true'
    };
    const payloadToken = jwt.sign(payload, process.env.tokens);
    const date = new Date();
    chai.request(server).post('/api/v2/order').set('x-auth-token', payloadToken).send({
      car_id: 1,
      buyer: payloadToken.id,
      date,
      amount: '4000'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid token');
        done();
      });
  });
});
