import Api from '../base';

class ExecuteApi extends Api {
  constructor() {
    super({ baseUrl: '/execute' });
  }

  code = this.sign<Api.Execute.ExecuteCodeRequest, any>({
    url: '/code',
    method: 'post'
  });
}

export default new ExecuteApi();
