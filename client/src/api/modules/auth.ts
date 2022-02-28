import Api from '../base';

class AuthApi extends Api {
  constructor() {
    super({
      baseUrl: '/auth'
    });
  }

  login = this.sign<Api.Auth.LoginRequest, Api.Auth.LoginResponse>({
    method: 'post',
    url: '/login',
  });

  profile = this.sign<Api.Auth.ProfileRequest, Api.Auth.ProfileResponse>({
    url: '/profile'
  });
}

export default new AuthApi();
