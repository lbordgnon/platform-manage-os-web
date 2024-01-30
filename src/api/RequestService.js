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


  static async EditOS(title, description,idRequest) {
    return await axios.post(`/Request/editRequest?idRequest=${idRequest}`, {
      title,
      description,
    });
  }

  static async cancelOS(idRequest) {
    return await axios.post(`/Request/editStatusRequest?idRequest=${idRequest}&status=4`);
  }

  static async conclusionOS(idRequest) {
    return await axios.post(`/Request/editStatusRequest?idRequest=${idRequest}&status=3`);
  }

  static async AddEngineer(idRequest,email) {
    return await axios.post(`/Request/AddEngineer?idRequest=${idRequest}&emailEgineer=${email}`);
  }

  static async getRequestListEngineer() {
    return await axios.get(`/Request/getRequestByEngineer`);
  }

  static async getRequestList(email) {
    return await axios.get(`/Request/getRequestByClient?email=${email}`);
  }

  static async getRequestByClient(query,email) {
    return await axios.get(`/Request/getRequestByClient?query=${query}&email=${email}`);
  }

  static async getRequestById(id) {
    return await axios.get(`/Request/getRequestById?id=${id}`);
  }

  static async getRequestByEngineer(email) {
    return await axios.get(`/Request/getRequestByEngineer?email=${email}`);
  }
}
