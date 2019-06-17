import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();
describe('get welcome message', () => {
  it('should return welcome message', (done) => {
    chai.request(server).get('/').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('welcome to Auto-Mart3');
      done();
    });
  });
});
describe('Users', () => {
  it('should register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(201);
      res.body.should.have.property('message').eql('User successfully created');
      res.body.data.should.be.an('object');
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('first_name');
      res.body.data.should.have.property('last_name');
      res.body.data.should.have.property('user_type');
      res.body.data.should.have.property('first_name').eql('nshuti');
      res.body.data.should.have.property('last_name').eql('jonathan');
      res.body.data.should.have.property('user_type').eql('buyer');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      done();
    });
  });
});
describe('Users', () => {
  it('should delete a user', (done) => {
    const admin = {
      is_admin: 'false'
    };
    const token = jwt.sign(admin, process.env.jwtPrivateKey);
    chai.request(server).delete('/api/v2/users/:100000000').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      done();
    });
  });
});
