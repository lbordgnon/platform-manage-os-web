import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5188/api';

export class ClienteService {
    
     static async signupClient(name,email,phone,password) {
      await axios.post('/Clients', {
            name,
            email,
            phone,
            password
          },
          )
          .then(function (response) {
            console.log(response)
           return true;
          })
          .catch(function (error) {
              console.log('error')
            console.log(error)
           return false;
          });
    }
}
