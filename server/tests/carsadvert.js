import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();
// define a dotenv variables;
const token = process.env.jwtPrivateKey;
const fakeToken = process.env.INVALID_TOKEN;
const date = new Date();
// testing all cars advert endpoints;
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
  it('should not create a car advert', (done) => {
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
  		res.body.should.have.property('message').eql('Invalid URl of the photo');
  		done();
  	});
  });
  it('should not create a car advert', (done) => {
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
  it('user should not be able to post a car sale ad', (done) => {
    const payload = {
      id: '1',
      email: 'alice@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      address: 'kigali',
      user_type: 'buyer',
      is_admin: 'false',
    };
    const token2 = jwt.sign(payload, process.env.tokens);
    chai.request(server)
      .post('/api/v2/car')
      .set('x-auth-token', token2)
      .send({
        owner: token2.id,
        created_on: date,
        manufacturer: 'Toyota',
        model: '2019 Toyota camry',
        price: '40000',
        state: 'new',
        status: 'available',
        body_type: 'car',
        photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/showcase.jpg'
      })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});
// testing get methods all cars with types;
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
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=available&min_price=&max_price=5000').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('min_price is required');
      done();
    });
  });
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=available&min_price=200&max_price=').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('max_price is required');
      done();
    });
  });
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=&min_price=200&max_price=900').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=av&min_price=200&max_price=900').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=available&min_price=@#$%max_price=900').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('max_price is required');
      done();
    });
  });
  it('should not get all available cars in range', (done) => {
    chai.request(server).get('/api/v2/range/cars?status=available&min_price=300&max_price=@#$%').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('max_price must not contain special characters');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get a car advert', (done) => {
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
  it('should not get available and new cars ', (done) => {
    chai.request(server).get('/api/v2/cars/available/new?status=&state=new').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get available and new cars ', (done) => {
    chai.request(server).get('/api/v2/cars/available/new?status=availablesss&state=new').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get available and new cars ', (done) => {
    chai.request(server).get('/api/v2/cars/available/new?status=available&state=').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('state is required');
      done();
    });
  });
  it('should not get available and new cars ', (done) => {
    chai.request(server).get('/api/v2/cars/available/new?status=available&state=newyork').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('state must be equal to new');
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
  it('should not get available and used  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/used?status=&state=used').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get available and used  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/used?status=av&state=used').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get available and used  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/used?status=available&state=').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('state is required');
      done();
    });
  });
  it('should not get available and used  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/used?status=available&state=useful').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('state must be equal to used');
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
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=&manufacturer=toyota').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=av&manufacturer=toyota').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=available&manufacturer=').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('manufacturer is required');
      done();
    });
  });
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=#@$&manufacturer=toyota').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get available with specific manufacturer  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/manufacturer?status=available&manufacturer=###$$').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('manufacturer is required');
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
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=&body_type=trailer').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status is required');
      done();
    });
  });
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=av&body_type=trailer').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=available&body_type=').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('body_type  is required');
      done();
    });
  });
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=a#%^^&body_type=car').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('status must be equal to available');
      done();
    });
  });
  it('should not get available with specific body_type  ', (done) => {
    chai.request(server).get('/api/v2/cars/available/bodytype?status=available&body_type=car####').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('no cars in specified range');
      done();
    });
  });
});
describe('Cars', () => {
  it('should not get specifi car  ', (done) => {
    chai.request(server).get('/api/v2/cars/19').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('Car with id 19 not found');
      done();
    });
  });
});
describe('Cars', () => {
  it('should delete a car advert   ', (done) => {
    chai.request(server).delete('/api/v2/cars/1').end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access Denied.No token provided');
      done();
    });
  });
});
describe('Cars', () => {
  it('should delete a car advert   ', (done) => {
    chai.request(server).delete('/api/v2/cars/1').set('x-auth-token', fakeToken).end((err, res) => {
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Invalid token');
      done();
    });
  });
});
