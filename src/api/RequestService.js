import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class RequestService {
  static async createOS(title, description, email) {
    return await axios.post('/Request', {
      title,
      description,
      emailClient: email,
    });
  }

  static async getRequestList(email) {
    return await axios.get(`/Request/getRequestByClient?email=${email}`);
  }
}
