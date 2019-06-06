import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();
const token = process.env.jwtPrivateKey;
const { expect } = chai;
describe('Home route', () => {
  it('should return home route', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('welcome to Auto-Mart3');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
describe('Users', () => {
  it('should  be able to fetch all Users', (done) => {
    chai.request(server)
      .get('/api/v2/users')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not be able to fetch all Users', (done) => {
    chai.request(server)
      .get('/api/v2/users')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(402);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
