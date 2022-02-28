/// <reference path="../../../typings/index.d.ts" />

declare interface JWTUser {
  id: number;
  email: string;
  permission: 0 | 1 | 2;
}
