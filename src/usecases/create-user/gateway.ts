import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class ICreateUserGateway {
  constructor(public readonly userRepository: UserRepository) {}
}
