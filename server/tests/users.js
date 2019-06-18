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
      console.log(res.body);
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
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(409);
      res.body.should.have.property('message').eql('User with that Email already exists');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: '',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('email is required');
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
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: '',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: '',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('password is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'alice@gmail.com@@##',
      address: '',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('address is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'alice@gmail.com@@##',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('your email must look like  this ex:andela@gmail.com');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'alice@gmail.com@@##',
      address: 'kigali',
      user_type: 'buyersr',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('this user_type field must be seller or buyer');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'alice@gmail.com@@##',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'true'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('is_admin field must be set to false');
      done();
    });
  });
});
describe('Users', () => {
  it('should sign in user', (done) => {
    chai.request(server).post('/api/v2/auth/signin').send({
      email: 'alice@gmail.com',
      password: 'chris@gmail.com',
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('Logged in successfully');
      done();
    });
  });
  it('should not sign in user', (done) => {
    chai.request(server).post('/api/v2/auth/signin').send({
      email: 'alice@gmail.com',
      password: '2wer'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('message').eql('INVALID email or password');
      done();
    });
  });
  it('should not sign in user', (done) => {
    chai.request(server).post('/api/v2/auth/signin').send({
      email: '',
      password: ''
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Some values are missing');
      done();
    });
  });
});
describe('Admin', () => {
  it('should not  sign in admin ', (done) => {
    chai.request(server).post('/api/v2/auth/signin/admin').send({
      email: 'rrur@gmail.com',
      password: 'ddss',

    })
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not  sign in admin ', (done) => {
    chai.request(server).post('/api/v2/auth/signin/admin').send({
      email: '',
      password: '',

    })
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('Users', () => {
  it('should get all users', (done) => {
    chai.request(server).get('/api/v2/users').set('x-auth-token', token).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('Users retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
  it('should not get all  users', (done) => {
    chai.request(server).get('/api/v2/users').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not get all  users', (done) => {
    chai.request(server).get('/api/v2/users').set('x-auth-token', fakeToken).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
describe('Users', () => {
  it('should delete a user', (done) => {
    chai.request(server).delete('/api/v2/users/1').set('x-auth-token', token).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 1 deleted successfully');
      done();
    });
  });
  it('should not delete a user', (done) => {
    chai.request(server).delete('/api/v2/users/10').set('x-auth-token', token).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('User with id 10 not found');
      done();
    });
  });
  it('should not delete a user', (done) => {
    chai.request(server).delete('/api/v2/users/1').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not delete a user', (done) => {
    chai.request(server).delete('/api/v2/users/1').set('x-auth-token', fakeToken).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
describe('Users', () => {
  it('should not be able to reset password  ', (done) => {
    chai.request(server).put('/api/v2/rukundo@gmail.com/reset_password').send({
      old_password: 'rukundo@gmail.comm',
      new_password: 'rukundo@gmail.com'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('message').eql('INVALID email or old password');
      done();
    });
  });
  it('should not be able to reset password  ', (done) => {
    chai.request(server).put('/api/v2/67g/reset_password').send({
      old_password: 'rukundo@gmail.comm',
      new_password: 'rukundo@gmail.com'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('message').eql('INVALID email or old password');
      done();
    });
  });
});
