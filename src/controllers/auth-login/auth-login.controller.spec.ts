import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginController } from './auth-login.controller';
import { AuthLoginUsecase } from '@usecases/auth-login/auth-login.usecase';
import { AuthLoginBodyDto } from './dto';
import type { IAuthLoginPresenter } from './adapter';
import { usecaseMock } from '@tests/usecases.mock';

type UsecaseOutput = Awaited<ReturnType<AuthLoginUsecase['execute']>>;

const mockInput: AuthLoginBodyDto = {
  email: 'test@example.com',
  password: 'securepassword123',
};

const mockUsecaseOutput: UsecaseOutput = 'mock_access_token_from_usecase';

describe('AuthLoginController', () => {
  let controller: AuthLoginController;
  let usecase: jest.Mocked<AuthLoginUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLoginController],
      providers: [
        {
          provide: AuthLoginUsecase,
          useValue: usecaseMock,
        },
      ],
    }).compile();

    controller = module.get<AuthLoginController>(AuthLoginController);
    usecase = module.get(AuthLoginUsecase);

    jest.clearAllMocks();
  });

  describe('✅ Success', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(usecase).toBeDefined();
      expect(typeof usecase.execute).toBe('function');
    });

    it('should call AuthLoginUsecase and return the adapted token on success', async () => {
      usecase.execute.mockResolvedValue(mockUsecaseOutput);

      const result = await controller.authlogin(mockInput);

      expect(usecaseMock.execute).toHaveBeenCalledWith(mockInput);
      expect(usecaseMock.execute).toHaveBeenCalledTimes(1);

      const expectedResponse: IAuthLoginPresenter = {
        token: mockUsecaseOutput,
      };

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('Errors', () => {
    it('should throw an exception if the usecase fails (e.g., invalid credentials)', async () => {
      const mockError = new Error('Invalid credentials');
      usecase.execute.mockRejectedValue(mockError);

      await expect(controller.authlogin(mockInput)).rejects.toThrow(mockError);
    });
  });
});
