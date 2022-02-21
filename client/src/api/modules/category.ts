import Api from '../base';

class CategoryApi extends Api {
  constructor() {
    super({
      baseUrl: '/category'
    });
  }

  list = this.sign<Api.Category.ListRequest, Api.Category.ListResponse>({
    url: '/list'
  });

  create = this.sign<Api.Category.CreateRequest, Api.Category.CreateResponse>({
    url: '/create',
    method: 'post'
  });

  delete = this.sign<Api.Category.DeleteRequest, Api.Category.DeleteResponse>({
    url: '/delete',
    method: 'delete'
  });
}

export default new CategoryApi();
