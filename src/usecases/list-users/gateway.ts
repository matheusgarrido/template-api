import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class IListUsersGateway {
  constructor(public readonly userRepository: UserRepository) {}
}
