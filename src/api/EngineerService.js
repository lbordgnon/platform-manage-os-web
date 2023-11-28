import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class EngineerService {

  static async getEngineerById(id) {
    return await axios.get(`/Engineer/getEngineerName?id=${id}`);
  }
}
