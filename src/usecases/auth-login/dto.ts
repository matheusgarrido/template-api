import { User } from '@entities/user.entity';

export interface IAuthLoginInput {
  email: string;
  password: string;
}

export type IAuthLoginOutput = Promise<{
  user: User;
  token: string;
}>;
