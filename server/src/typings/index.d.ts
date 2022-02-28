/// <reference path="../../../typings/index.d.ts" />

interface JwtUser {
  id: number;
  permission: 0 | 1 | 2;
  email: string;
}