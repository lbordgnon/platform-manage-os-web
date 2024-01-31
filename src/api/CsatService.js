import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class CsatService {
  static async addRate(idRequest, idEngineer, rate) {
    return await axios.post('/Rating', {
      idRequest,
      idEngineer,
      rate,
    });
  }
}
