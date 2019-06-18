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
describe('Cars', () => {
  it('should not get all available cars', (done) => {
    chai.request(server).get('/api/v2/status/cars?status=available').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('No available car found');
      res.body.data.should.be.an('array');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=available&min_price=300&max_price=5000').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars in specified range');
      res.body.data.should.be.an('array');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not delete a car advert', (done) => {
    chai.request(server).get('/api/v2/cars/14').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('Car with id 14 not found');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get available and new cars ', (done) => {
    chai.request(server).get('/api/v2/cars/available/new?status=available&state=new').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars ');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get available and used  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/used?status=available&state=used').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars ');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=available&manufacturer=toyota').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars in specified range');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=available&body_type=trailer').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars in specified range');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not specifi car  ', (done) => {
    chai.request(server).get('/api/v2/cars/19').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('Car with id 19 not found');
      done();
    });
  });
});
