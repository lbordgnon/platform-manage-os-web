import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class BudgetService {

  static async createBudget(title, description, value, emailEngineer,idRequest) {
    return await axios.post('/Budget', {
      title,
      description,
      value,
      emailEngineer,
      idRequest
    });
  }
  
}
