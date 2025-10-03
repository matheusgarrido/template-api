import { InvalidUserCredentialsError } from '@shared/errors/unauthorized';
import { PasswordService } from './password.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserNotFoundError } from '@shared/errors';
import { TokenService } from './token.service';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    if (!email || !password) throw new InvalidUserCredentialsError();

    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UserNotFoundError();

    const isValidPassword = await this.passwordService.compare(password, user);
    if (!isValidPassword) throw new InvalidUserCredentialsError();

    const token = this.tokenService.generate({
      ...user.toSafeJSON(),
      id: user.id!,
    });
    return token;
  }
}
