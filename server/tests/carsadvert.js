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
    chai.request(server).get('/api/v2/cars').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('Cars adverts retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
  it('should create a car advert', (done) => {
  	chai.request(server).post('/api/v2/car').send({
      status: 'available',
      state: 'used',
      price: '200',
      manufacturer: 'toyota',
      model: 'bmw',
      body_type: 'trailer',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/showcase.jpg'
  	})
      .end((err, res) => {
  		res.body.should.be.an('object');
  		res.body.should.have.property('status').eql(402);
  		res.body.should.have.property('message').eql('Access Denied.No token provided');
  		done();
  	});
  });
  it('should create a car advert', (done) => {
  	chai.request(server).post('/api/v2/car').set('x-auth-token', token).send({
      status: 'available',
      state: 'used',
      price: '200',
      manufacturer: 'toyota',
      model: 'bmw',
      body_type: 'trailer',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/showcase.jpg'
  	})
      .end((err, res) => {
  		res.body.should.be.an('object');
  		res.body.should.have.property('status').eql(404);
  		res.body.should.have.property('message').eql('create user account first');
  		done();
  	});
  });
  it('should create a car advert', (done) => {
  	chai.request(server).post('/api/v2/car').set('x-auth-token', fakeToken).send({
      status: 'available',
      state: 'used',
      price: '200',
      manufacturer: 'toyota',
      model: 'bmw',
      body_type: 'trailer',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/showcase.jpg'
  	})
      .end((err, res) => {
  		res.body.should.be.an('object');
  		res.body.should.have.property('status').eql(400);
  		res.body.should.have.property('message').eql('Invalid token');
  		done();
  	});
  });
  it('user should be able to post a car sale ad', (done) => {
    const payload = {
      id: '1',
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false',
    };
    const token2 = jwt.sign(payload, process.env.jwtPrivateKey);
    chai.request(server)
      .post('/api/v2/car')
      .set('x-auth-token', token2)
      .send({
        manufacturer: 'Toyota',
        model: '2019 Toyota camry',
        price: '40000',
        state: 'new',
        status: 'available',
        body_type: 'car',
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});
