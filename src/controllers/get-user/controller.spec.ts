import { Test, TestingModule } from '@nestjs/testing';
import type { I, P } from './controller';
import { GetUserController } from './controller';
import { GetUserUsecase } from '@usecases/get-user/usecase';
import { GetUserParamsDto } from './dto';
import { usecaseMock } from '@tests/usecases.mock';
import { currentUserMock, userMock } from '@tests/user.mock';
import { AuthGuard } from '@infra/decorators/auth';
import { MockAuthGuard } from '@tests/guards/auth-guard.mock';

type UsecaseOutput = Awaited<ReturnType<GetUserUsecase['execute']>>;

const mockParams: GetUserParamsDto = {
  id: userMock.id as string,
};

const mockInput: I = {
  id: mockParams.id,
  currentUser: currentUserMock,
};

const mockUsecaseOutput: UsecaseOutput = userMock;

describe('GetUserController', () => {
  let controller: GetUserController;
  let usecase: jest.Mocked<GetUserUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [
        {
          provide: GetUserUsecase,
          useValue: usecaseMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(new MockAuthGuard())
      .compile();

    controller = module.get<GetUserController>(GetUserController);
    usecase = module.get(GetUserUsecase);

    jest.clearAllMocks();
  });

  describe('✅ Success', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should call GetUserUsecase and return the found user on success', async () => {
      usecase.execute.mockResolvedValue(mockUsecaseOutput);

      const result = await controller.findOne(mockParams, currentUserMock);

      expect(usecaseMock.execute).toHaveBeenCalledWith(mockInput);
      expect(usecaseMock.execute).toHaveBeenCalledTimes(1);

      const expectedResponse: P = { user: userMock.toSafeJSON() };

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('Errors', () => {
    it('should throw an exception if the usecase fails (e.g., invalid credentials)', async () => {
      const mockError = new Error('Invalid credentials');
      usecase.execute.mockRejectedValue(mockError);

      await expect(
        controller.findOne(mockParams, currentUserMock),
      ).rejects.toThrow(mockError);
    });
  });
});
