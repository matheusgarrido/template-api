import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class IGetUserGateway {
  constructor(public readonly userRepository: UserRepository) {}
}
