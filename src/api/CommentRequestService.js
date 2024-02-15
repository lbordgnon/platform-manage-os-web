import axios from 'axios';

axios.defaults.baseURL = 'https://ms-manage-os.azurewebsites.net/api';

export class CommentRequestService {

  static async getAllCommentRequestList(idRequest) {
    return await axios.get(`/CommentRequest/AllCommentRequests?idRequest=${idRequest}`);
  }

  static async CreateCommentRequest(userLogin, coment,idRequest) {
    return await axios.post('/CommentRequest', {
      userLogin,
      coment,
      idRequest,
    });
  }
}
