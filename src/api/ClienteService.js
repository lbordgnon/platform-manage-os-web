import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5188/api';

export class ClienteService {
    
    static signupClient(name,email,phone,password) {
        axios.post('/Clients', {
            name,
            email,
            phone,
            password
          },
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}
