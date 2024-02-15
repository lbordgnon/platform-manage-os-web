import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

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

  static async editBudget(id,title, description, value) {
    return await axios.post('/Budget/EditBudget', {
      id,
      title,
      description,
      value
    });
  }

  static async getAllBudgets(email) {
    return await axios.get(`Budget?emailEnginer=${email}`);
  }

  static async getBudgetById(id) {
    return await axios.get(`/Budget/getBudgetById?id=${id}`);
  }

  static async getBudgetByRequestId(id) {
    return await axios.get(`/Budget/getBudgetByRequestId?requestId=${id}`);
  }

  static async approveBudget(id) {
    return await axios.post(`/Budget/ApprovedBudget?idBudget=${id}`);
  }

}
