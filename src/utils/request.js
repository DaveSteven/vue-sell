const axios = require('axios');

const service = axios.create({
  timeout: 15000
});

service.interceptors.response.use(
  response => {
    if (response.data.errno === 0) {
      return response.data;
    } else {
      return Promise.reject('error');
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;