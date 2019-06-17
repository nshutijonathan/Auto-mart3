import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../server';

chai.use(chaiHttp);
chai.should();
dotenv.config();
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
