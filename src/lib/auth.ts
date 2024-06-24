import { PickDeep } from '@libs/graphql';
import { AUTH_FRAGMENT } from '@libs/requests/auth/types';
import { USER_FRAGMENT } from '@libs/requests/lib/user/types';

export const USER_PATHS = [
  'id',
  'email',
  'isActive',
  'role',
  'username',

  'client.name',
  'client.accountType',
  'client.commercialName',
  'client.phoneNumber',
  'client.shortName',
  'client.productType',
  'client.address',
  'client.packageType',
  'client.taxNumber',

  'company.name',
  'company.task',
  'company.commercialName',
  'company.name',
  'company.phoneNumber',

  'collaborator.role.id',
  'collaborator.role.name',
  'collaborator.role.modules.module',
  'collaborator.role.modules.permission',
] satisfies (typeof USER_FRAGMENT._paths)[];

export const AUTH_PATHS = [
  ...(USER_PATHS.map(
    (u) => `user.${u}`,
  ) as `user.${(typeof USER_PATHS)[number]}`[]),

  'token.accessToken',
  'token.expiresIn',
  'token.tokenType',
  'token.refreshToken',
] satisfies (typeof AUTH_FRAGMENT._paths)[];

export type Auth = PickDeep<
  typeof AUTH_FRAGMENT._output,
  (typeof AUTH_PATHS)[number]
>;

export type User = Auth['user'];
export type Token = Auth['token'];
