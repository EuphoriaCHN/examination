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

  update = this.sign<Api.User.UpdateRequest, Api.User.UpdateResponse>({
    url: '/update',
    method: 'put'
  });

  updatePassword = this.sign<Api.User.UpdatePasswordRequest, Api.User.UpdatePasswordResponse>({
    url: '/updatePassword',
    method: 'put'
  });
}

export default new UserApi();