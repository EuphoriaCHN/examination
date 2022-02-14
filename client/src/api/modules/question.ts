import Api from '../base';

class QuestionApi extends Api {
  constructor() {
    super({
      baseUrl: '/question'
    });
  }

  list = this.sign<Api.Question.ListRequest, Api.Question.ListResponse>({ url: '/list' });
}

export default new QuestionApi();
