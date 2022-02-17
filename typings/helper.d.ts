declare namespace TypeHelper {
  type Equal<A, B> = <T>() => T extends X ? 1 : 2 extends <T>() => T extends Y ? 1 : 2 ? true : false;

  type _ConvertStructOpts<T> = {
    includes?: keyof T;
    excludes?: keyof T;
    optional?: keyof T;
    required?: keyof T;
  };

  /**
   * 对一个结构进行加工
   * 
   * ```ts
   * interface People {
   *   name: string;
   *   age: number;
   *   hobbies: any[];
   * }
   * 
   * type Res = ConvertStruct<People, {
   *   includes: 'name' | 'age',
   *   optional: 'age'
   * }>;
   * ```
   * 
   * 那么 Res 的结果是：
   * 
   * ```ts
   * type Res = {
   *   name: string;
   *   age?: number;
   * };
   * ```
   */
  type ConvertStruct<T, O extends _ConvertStructOpts<T>> =
    (O['includes'] extends keyof T ? Pick<T, O['includes']> : T) extends infer Next ?
    (O['excludes'] extends keyof T ? Omit<Next, O['excludes']> : Next) extends infer Next ?
    (O['optional'] extends keyof T ?
      Next extends any ?
      Partial<Pick<Next, O['optional']>> & Omit<Next, O['optional']> :
      Next : Next) extends infer Next ?
    (O['required'] extends keyof T ?
      Next extends any ?
      Required<Pick<Next, O['required']>> & Omit<Next, O['required']> :
      Next : Next) : never : never : never;
}
