/// <reference path="./helper.d.ts" />

interface _IBaseStructure {
  /**
  * ID
  */
  id: number;
  /**
   * 创建时间，非 UNIX 时间戳格式
   */
  createTime: number;
  /**
   * 更新时间，非 UNIX 时间戳格式
   */
  updateTime: number;
}

/**
 * 分类
 */
interface ICategoryItem extends _IBaseStructure {
  /**
   * 分类名称，最长 32 字符
   */
  name: string;
  /**
   * 分类描述，最长 128 字符
   */
  description: string;
  /**
   * 子分类
   */
  children: ICategoryItem[];
  /**
   * 父分类
   */
  parent: ICategoryItem | null;
}

/**
 * 标签
 */
interface ITagItem extends _IBaseStructure {
  /**
   * 标签名称，最长 32 字符
   */
  name: string;
  /**
   * 标签描述，最长 128 字符
   */
  description: string;
}

/**
 * 题目
 */
interface IQuestionItem extends _IBaseStructure {
  /**
   * 题目标题
   */
  title: string;
  /**
   * 题面
   */
  content: string;
  /**
   * 题目注释
   */
  comment: string;
  /**
   * 题目答案
   */
  answer: string;
  /**
   * 题目难度
   */
  level: 0 | 1 | 2 | 3 | 4;
  /**
   * 题目热度
   */
  hotCount: number;
  /**
   * 所属分类
   */
  categories: ICategoryItem[];
  /**
   * 标签集合
   */
  tags: ITagItem[];
}

declare namespace Api {
  namespace _Base {
    type Pagination = {
      limit?: number;
      offset?: number;
    };

    type RequiredPagination = Required<Pagination>;

    type CommonResponse = void;

    type ListRequest<T> = T & Pagination;

    type ListResponse<T> = {
      data: T[];
      total: number;
    };
  }

  namespace Question {
    type DetailRequest = TypeHelper.ConvertStructure<IQuestionItem, {
      includes: 'id'
    }>;

    type DetailResponse = IQuestionItem;

    type RandomRequest = {};

    type RandomResponse = IQuestionItem;

    type ListRequest = _Base.ListRequest<{}>;

    type ListResponse = _Base.ListResponse<IQuestionItem>;

    type CreateRequest = TypeHelper.ConvertStructure<IQuestionItem, {
      excludes: 'id' | 'createTime' | 'updateTime' | 'hotCount'
      optional: 'comment' | 'answer' | 'categories' | 'tags',
    }>;

    type CreateResponse = _Base.CommonResponse;

    type DeleteRequest = TypeHelper.ConvertStructure<IQuestionItem, {
      includes: 'id'
    }>;

    type DeleteResponse = _Base.CommonResponse;

    type UpdateRequest = TypeHelper.ConvertStructure<IQuestionItem, {
      excludes: 'createTime' | 'updateTime' | 'hotCount'
      optional: 'title' | 'content' | 'comment' | 'answer' | 'level',
    }>;

    type UpdateResponse = _Base.CommonResponse;
  }

  namespace Category {
    type CreateRequest = TypeHelper.ConvertStructure<ICategoryItem, {
      includes: 'name' | 'description',
      optional: 'description'
    }> & {
      /**
       * 父分类 ID，如果是 0 则为顶层元素
       */
      parentId: number;
    };

    type CreateResponse = _Base.CommonResponse;

    type ListRequest = _Base.ListRequest<{}>;

    type ListResponse = ICategoryItem[];

    type UpdateRequest = TypeHelper.ConvertStructure<ICategoryItem, {
      includes: 'id' | 'name' | 'description',
      optional: 'name' | 'description',
    }>;

    type UpdateResponse = _Base.CommonResponse;

    type DeleteRequest = TypeHelper.ConvertStructure<ICategoryItem, {
      includes: 'id'
    }>;

    type DeleteResponse = _Base.CommonResponse;
  }

  namespace Tag {
    type CreateRequest = TypeHelper.ConvertStructure<ITagItem, {
      includes: 'name' | 'description',
      optional: 'description'
    }>;

    type CreateResponse = _Base.CommonResponse;

    type ListRequest = _Base.ListRequest<{}>;

    type ListResponse = _Base.ListResponse<ITagItem>;

    type UpdateRequest = TypeHelper.ConvertStructure<ICategoryItem, {
      includes: 'id' | 'name' | 'description',
      optional: 'name' | 'description',
    }>;

    type UpdateResponse = _Base.CommonResponse;

    type DeleteRequest = TypeHelper.ConvertStructure<ICategoryItem, {
      includes: 'id'
    }>;

    type DeleteResponse = _Base.CommonResponse;
  }
}
