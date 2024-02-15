import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

export class CsatService {
  static async addRate(idRequest, idEngineer, rate) {
    return await axios.post('/Rating', {
      idRequest,
      idEngineer,
      rate,
    });
  } 
  
  static async getRatingByEngineer(emailEngineer) {
    return await axios.get(`/Rating/getRatingByEngineer?emailEngineer=${emailEngineer}`);
  }

}
