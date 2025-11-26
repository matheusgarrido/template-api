import { PasswordService } from 'api/src/application/services/password.service';
import { TokenService } from 'api/src/application/services/token.service';
import { Injectable } from '@nestjs/common';
import { IGateway } from '@shared/protocols/gateway.protocol';
import { PinoLogger } from 'nestjs-pino';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class IAuthLoginGateway implements IGateway {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly tokenService: TokenService,
    public readonly passwordService: PasswordService,
    public readonly logger: PinoLogger,
  ) {}
}
