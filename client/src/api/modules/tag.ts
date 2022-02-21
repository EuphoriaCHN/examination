import Api from '../base';

class TagApi extends Api {
  constructor() {
    super({
      baseUrl: '/tag'
    });
  }

  list = this.sign<Api.Tag.ListRequest, Api.Tag.ListResponse>({
    url: '/list'
  });

  create = this.sign<Api.Tag.CreateRequest, Api.Tag.CreateResponse>({
    url: '/create',
    method: 'post'
  });

  delete = this.sign<Api.Tag.DeleteRequest, Api.Tag.DeleteResponse>({
    url: '/delete',
    method: 'delete'
  });

  update = this.sign<Api.Tag.UpdateRequest, Api.Tag.UpdateResponse>({
    url: '/update',
    method: 'put'
  });
}

export default new TagApi();
