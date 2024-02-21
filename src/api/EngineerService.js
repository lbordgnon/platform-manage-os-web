import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

export class EngineerService {

  static async getEngineerById(id) {
    return await axios.get(`/Engineer/getEngineerName?id=${id}`);
  }

  static async getAllEngineers() {
    return await axios.get(`/Engineer/getAll`);
  }

  static async disableEngineer(email) {
    return await axios.delete(`/Engineer?Email=${email}`);
  }

  
  static async enableEngineer(email) {
    return await axios.post(`/Engineer/enable?Email=${email}`);
  }


  static async signupEngineer(name, email, phone,federalId,password) {
    return await axios.post('/Engineer', {
      name,
      email,
      phone,
      federalId,
      password,
    });
  }
}
