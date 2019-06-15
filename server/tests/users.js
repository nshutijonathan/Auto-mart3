import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../server';

chai.use(chaiHttp);
chai.should();
dotenv.config();
const token = process.env.jwtPrivateKey;
const invalid_token = process.env.INVALID_TOKEN;
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
  it('should return all users', (done) => {
    chai.request(server).get('/api/v2/users').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('Users retrieved successfully');
      res.body.should.have.property('data');
      res.body.data.should.be.an('array');
      done();
    });
  });

  it('should not return all users it no token provided', (done) => {
    chai.request(server).get('/api/v2/users').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not return all users when invalid token is inputed', (done) => {
    chai.request(server).get('/api/v2/users').set('x-auth-token', invalid_token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
  it('should return single user', (done) => {
    chai.request(server).get('/api/v2/users/1').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 1 retrieved successfully');
      res.body.should.have.property('data');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('first_name');
      res.body.data.should.have.property('last_name');
      res.body.data.should.have.property('address');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('user_type');
      res.body.data.should.have.property('is_admin');
      res.body.data.should.be.an('object');
      done();
    });
  });
  it('should not return single user when no token provided', (done) => {
    chai.request(server).get('/api/v2/users/1').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('should not return single user when invalid token is inputed', (done) => {
    chai.request(server).get('/api/v2/users/1').set('x-auth-token', invalid_token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
  it('should not  return unexisting user', (done) => {
    chai.request(server).get('/api/v2/users/100').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('User with id 100 not found');
      done();
    });
  });
});
describe('Delete Users', () => {
  it('Should delete User', (done) => {
    chai.request(server).delete('/api/v2/users/1').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 1 deleted successfully');
      done();
    });
  });
  it('Should not  delete User when invalid token is provided', (done) => {
    chai.request(server).delete('/api/v2/users/1').set('x-auth-token', invalid_token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
  it('Should not  delete User when  token is not provided', (done) => {
    chai.request(server).delete('/api/v2/users/1').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
  it('Should not delete User who does not  exist', (done) => {
    chai.request(server).delete('/api/v2/users/100').set('x-auth-token', token).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('User with id 100 not found');
      done();
    });
  });
});
describe('User sign up ', () => {
  it('should register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'chris@gmail.com',
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
  it('should not register new user (email already exists)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'chris@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(409);
      res.body.should.have.property('message').eql('User with that Email already exists');
      done();
    });
  });
  it('should not register new user (email is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: '',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('email is required');
      done();
    });
  });
  it('should not register new user (wrong email format)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('your email must look like  this ex:andela@gmail.com');
      done();
    });
  });
  it('should not register new user (first_name is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
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
  it('should not register new user (first_name must be string)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '12345',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name must be string');
      done();
    });
  });
  it('should not register new user (last_name is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'jonathan',
      last_name: '',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name is required');
      done();
    });
  });
  it('should not register new user (last_name must be string)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'jonathan',
      last_name: '123456',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name must be string');
      done();
    });
  });
  it('should not register new user (first_name must not contain special characters)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '##**nn',
      last_name: 'bebe',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name must not contain special characters');
      done();
    });
  });
  it('should not register new user (last_name must not contain special characters)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: '#$%*nnn',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name must not contain special characters');
      done();
    });
  });
  it('should not register new user (password is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: '',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('password is required');
      done();
    });
  });
  it('should not register new user (password is too short)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'aa',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('password is too short');
      done();
    });
  });
  it('should not register new user (address is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('address is required');
      done();
    });
  });
  it('should not register new user (address must not contail special characters) ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '##$@#$nn',
      user_type: 'buyer',
      is_admin: 'false'
    }).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('address must not contail special characters');
      done();
    });
  });

  it('should not register new user (the user_type field is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: '',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('the user_type field is required');
      done();
    });
  });

  it('should not register new user (this user_type field must be seller or buyer)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('this user_type field must be seller or buyer');
      done();
    });
  });
  it('should not register new user (the is_admin field is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: ''
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('the is_admin field is required');
      done();
    });
  });
  it('should not register new user (this is_admin field must be true of false)', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'no'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('this is_admin field must be true or false');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v2/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
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


describe('Admin sign up ', () => {
  it('should register new admin ', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'herve@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Admin successfully created');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('first_name');
        res.body.data.should.have.property('last_name');
        res.body.data.should.have.property('user_type');
        res.body.data.should.have.property('is_admin');
        res.body.data.should.have.property('first_name').eql('nshuti');
        res.body.data.should.have.property('last_name').eql('jonathan');
        res.body.data.should.have.property('user_type').eql('admin');
        res.body.data.should.have.property('is_admin').eql('true');
        done();
      });
  });
  it('should not register new admin(email already exists)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'herve@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('message').eql('User with that Email already exists');
        done();
      });
  });
  it('should not register new admin (email is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: '',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('email is required');
        done();
      });
  });
  it('should not register new admin (wrong email format)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('your email must look like  this ex:andela@gmail.com');
        done();
      });
  });
  it('should not register new admin (first_name is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: '',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('first_name is required');
        done();
      });
  });
  it('should not register new admin (first_name must be string)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: '12345',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('first_name must be string');
        done();
      });
  });
  it('should not register new user (last_name is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'jonathan',
      last_name: '',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('last_name is required');
        done();
      });
  });
  it('should not register new user (last_name must be string)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'jonathan',
      last_name: '123456',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('last_name must be string');
        done();
      });
  });
  it('should not register new user (first_name must not contain special characters)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: '##**nn',
      last_name: 'bebe',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('first_name must not contain special characters');
        done();
      });
  });
  it('should not register new user (last_name must not contain special characters)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: '#$%*nnn',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('last_name must not contain special characters');
        done();
      });
  });
  it('should not register new user (password is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: '',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('password is required');
        done();
      });
  });
  it('should not register new user (password is too short)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'aa',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('password is too short');
        done();
      });
  });
  it('should not register new user (address is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('address is required');
        done();
      });
  });
  it('should not register new user (address must not contail special characters) ', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '##$@#$nn',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('address must not contail special characters');
        done();
      });
  });

  it('should not register new user (the user_type field is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: '',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('the user_type field is required');
        done();
      });
  });

  it('should not register new user (this user_type field must be seller or buyer)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('this user_type field must be admin');
        done();
      });
  });
  it('should not register new user (the is_admin field is required)', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: ''
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('the is_admin field is required');
        done();
      });
  });
  it('should not register new admin(this is_admin field must be true) ', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'false'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('this is_admin field must be true ');
        done();
      });
  });
  it('should not register new admin(wrong token) ', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').set('x-auth-token', invalid_token).send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Invalid token');
        done();
      });
  });
  it('should not register new admin(no token provided) ', (done) => {
    chai.request(server).post('/api/v2/auth/signup/admin').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      user_type: 'admin',
      is_admin: 'true'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(402);
        res.body.should.have.property('message').eql('Access Denied.No token provided');
        done();
      });
  });
});
