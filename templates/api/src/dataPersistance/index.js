const axios = require('axios');

export default () => {
  return new Promise((resolve, reject) => {
    try {
      const httpClient = axios.create({
        baseURL: process.env.DATA_API_URL,
        timeout: 1000,
        headers: {
          'Accepts': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      //Test the connection to the API that you use for data persistence

      resolve(httpClient);
    } catch (err) {
      reject(err);
    }
  });
}
