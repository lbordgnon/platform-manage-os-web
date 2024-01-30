import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class UserService {

  static async login(email, password) {
    return await axios.post(`/User/Login?login=${email}&password=${password}`);
  }


  static async editUser(oldLogin, newLogin,password) {
    return await axios.post(`/User/editUser`, {
      oldLogin,
      newLogin,
      password,
    });
  }

  static async getUserName(idUser) {
    return await axios.get(`/User/getUserName?idUser=${idUser}`);

  }
  
}
