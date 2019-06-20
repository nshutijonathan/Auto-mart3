import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();
describe('methods', () => {
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v1/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v3/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v5/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v4/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v6/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/v5/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/v4/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/v6/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
});
describe('methods', () => {
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v9/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v30/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v50/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v40/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/api/v60/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/v50/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/ap/v40/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
  it('should not get this method', (done) => {
    chai.request(server).get('/ap/v60/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(405);
      res.body.should.have.property('message').eql('METHOD NOT ALLOWED');
      done();
    });
  });
});
