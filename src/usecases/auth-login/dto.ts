export interface IAuthLoginInput {
  email: string;
  password: string;
}

export type IAuthLoginOutput = Promise<string>;
