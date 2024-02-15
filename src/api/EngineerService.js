import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

export class EngineerService {

  static async getEngineerById(id) {
    return await axios.get(`/Engineer/getEngineerName?id=${id}`);
  }
}
