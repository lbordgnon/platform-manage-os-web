import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class ClienteService {

  static async signupClient(name, email, phone, password) {
    return await axios.post('/Clients', {
      name,
      email,
      phone,
      password,
    });
  }
}
