import { User } from '@entities/users.entity';

export interface IGetUserInput {
  id: string;
}

export type IGetUserOutput = User[];
