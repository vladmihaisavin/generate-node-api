require('dotenv').config();
const axios = require('axios');
const expect = require('chai').expect;

describe('Base router', () => {

  it('Status', (done) => {
    axios.get(process.env.API_URL)
      .then((response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });
  it('Content', (done) => {
    axios.get(process.env.API_URL)
      .then((response) => {
        expect(response.data.version).to.equal('1.0.0');
        done();
      });
  });
});
