import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5188/api';

export class CommentRequestService {

  static async getAllCommentRequestList(idRequest) {
    return await axios.get(`/CommentRequest/AllCommentRequests?idRequest=${idRequest}`);
  }

  static async CreateCommentRequest(userLogin, coment,idRequest) {
    return await axios.post('/Request', {
      userLogin,
      coment,
      idRequest,
    });
  }
}
