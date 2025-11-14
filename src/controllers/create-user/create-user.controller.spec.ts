import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './create-user.controller';
import { CreateUserUsecase } from '@usecases/create-user/create-user.usecase';
import { CreateUserBodyDto } from './dto';
import type { ICreateUserPresenter } from './adapter';
import { usecaseMock } from '@tests/usecases.mock';
import { userMock } from '@tests/user.mock';

type UsecaseOutput = Awaited<ReturnType<CreateUserUsecase['execute']>>;

const mockInput: CreateUserBodyDto = {
  name: userMock.name as string,
  email: userMock.email as string,
  password: userMock.password as string,
};

const mockUsecaseOutput: UsecaseOutput = userMock.id as string;

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let usecase: jest.Mocked<CreateUserUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserUsecase,
          useValue: usecaseMock,
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    usecase = module.get(CreateUserUsecase);

    jest.clearAllMocks();
  });

  describe('✅ Success', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should call CreateUserUsecase and return the created user id on success', async () => {
      usecase.execute.mockResolvedValue(mockUsecaseOutput);

      const result = await controller.create(mockInput);

      expect(usecaseMock.execute).toHaveBeenCalledWith(mockInput);
      expect(usecaseMock.execute).toHaveBeenCalledTimes(1);

      const expectedResponse: ICreateUserPresenter = {
        id: userMock.id as string,
      };

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('Errors', () => {
    it('should throw an exception if the usecase fails (e.g., invalid credentials)', async () => {
      const mockError = new Error('Invalid credentials');
      usecase.execute.mockRejectedValue(mockError);

      await expect(controller.create(mockInput)).rejects.toThrow(mockError);
    });
  });
});
