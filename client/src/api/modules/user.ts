import Api from '../base';

class UserApi extends Api {
  constructor() {
    super({ baseUrl: '/user' });
  }

  register = this.sign<Api.User.RegisterRequest, Api.User.RegisterResponse>({
    url: '/register',
    method: 'post'
  });

  checkEmailExist = this.sign<Api.User.CheckEmailExistRequest, Api.User.CheckEmailExistResponse>({
    url: '/checkEmailExist'
  });
}

export default new UserApi();