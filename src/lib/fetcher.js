import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ma-arthur-api-006042b68258.herokuapp.com/',
    timeout: 1000,
  });
  export default instance;