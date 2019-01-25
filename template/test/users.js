require('dotenv').config();
const axios = require('axios');
const expect = require('chai').expect;

describe('Users', () => {

  it('Status - List', (done) => {
    axios.get(`${process.env.API_URL}/users`)
      .catch((err) => {
        expect(err.response.data.status).to.equal(401);
        done();
      });
  });

  it('Status - Create', (done) => {
    axios.get(`${process.env.API_URL}/users`)
      .catch((err) => {
        expect(err.response.data.status).to.equal(401);
        done();
      });
  });

  it('Status - Show', (done) => {
    axios.get(`${process.env.API_URL}/users/12`)
      .catch((err) => {
        expect(err.response.data.status).to.equal(401);
        done();
      });
  });

  it('Status - Update', (done) => {
    axios.get(`${process.env.API_URL}/users/12`)
      .catch((err) => {
        expect(err.response.data.status).to.equal(401);
        done();
      });
  });

  it('Status - Delete', (done) => {
    axios.get(`${process.env.API_URL}/users/12`)
      .catch((err) => {
        expect(err.response.data.status).to.equal(401);
        done();
      });
  });
});
