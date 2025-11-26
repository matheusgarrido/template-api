import { Injectable } from '@nestjs/common';
import { IGateway } from '@shared/protocols/gateway.protocol';
import { PinoLogger } from 'nestjs-pino';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class IUpdateUserGateway implements IGateway {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly logger: PinoLogger,
  ) {}
}
