import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class UserService {
  static async login(email, password) {
    return await axios.post(`/User/Login?login=${email}&password=${password}`);
  }
}
