import Api from '../base';

class QuestionApi extends Api {
  constructor() {
    super({
      baseUrl: '/question'
    });
  }

  list = this.sign<Api.Question.ListRequest, Api.Question.ListResponse>({ url: '/list' });

  create = this.sign<Api.Question.CreateRequest, Api.Question.CreateResponse>({
    url: '/create',
    method: 'post'
  });

  delete = this.sign<Api.Question.DeleteRequest, Api.Question.DeleteResponse>({
    url: '/delete',
    method: 'delete'
  });
}

export default new QuestionApi();
