import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

export class ClienteService {

  static async signupClient(name, email, phone, password) {
    return await axios.post('/Clients', {
      name,
      email,
      phone,
      password,
    });
  }

  static async getClientName(id) {
    return await axios.get(`/Clients/getClientName?id=${id}`);
  }
}
