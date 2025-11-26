import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthLoginController } from './controller';
import { AuthLoginUsecase } from '@usecases/auth-login/usecase';
import { AuthLoginBodyDto } from './dto';

// 1. Mock do Usecase
const mockAuthLoginUsecase = {
  // Simula a execução: sempre retorna um token de teste
  execute: jest.fn().mockResolvedValue('MOCKED_ACCESS_TOKEN_FROM_USECASE'),
};

describe('AuthLoginController (E2E)', () => {
  let app: INestApplication;
  const endpoint = '/auth/login';

  beforeAll(async () => {
    // 2. Criação do Módulo de Teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // Importa apenas o Controller, isolando-o
      controllers: [AuthLoginController],
      // Fornece o mock para o Usecase
      providers: [
        {
          provide: AuthLoginUsecase, // O token de injeção real
          useValue: mockAuthLoginUsecase, // A implementação mockada
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Você precisará aplicar o validation pipe aqui se quiser testar a validação
    // app.useGlobalPipes(createValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Testes de Sucesso ---
  it('POST /auth/login - Should return 200 and the formatted token', async () => {
    const loginData: AuthLoginBodyDto = {
      email: 'test@example.com',
      password: 'validpassword',
    };

    const response = await request(app.getHttpServer())
      .post(endpoint)
      .send(loginData)
      .expect(200); // Verifica o status HTTP

    // 1. Verifica se o Usecase foi chamado corretamente
    expect(mockAuthLoginUsecase.execute).toHaveBeenCalledTimes(1);
    expect(mockAuthLoginUsecase.execute).toHaveBeenCalledWith(loginData);

    // 2. Verifica se a resposta foi adaptada corretamente (IAuthLoginPresenter)
    expect(response.body).toEqual({
      token: 'MOCKED_ACCESS_TOKEN_FROM_USECASE', // Deve ser exatamente o retorno do usecase
    });
  });

  // --- Testes de Erro e Validação ---

  it('POST /auth/login - Should handle Usecase failure and return 401/500 (Depending on NestJS Exception Filter)', async () => {
    // Simula uma falha de login (ex: credenciais inválidas) no Usecase
    mockAuthLoginUsecase.execute.mockRejectedValueOnce(
      new Error('Invalid credentials'),
    );

    await request(app.getHttpServer())
      .post(endpoint)
      .send({ email: 'wrong@example.com', password: 'wrong' })
      // Se você estiver usando um filtro de exceção padrão do NestJS para erros não-HTTP,
      // ele pode retornar 500 ou 401 (se você usar uma HttpException)
      .expect(500);

    expect(mockAuthLoginUsecase.execute).toHaveBeenCalledTimes(1);
    // Verifique o corpo da resposta para garantir que a mensagem de erro correta esteja presente, se aplicável.
  });

  // Se o validation pipe estiver habilitado (app.useGlobalPipes(...)), você pode testar a validação:
  /*
  it('POST /auth/login - Should return 400 for invalid body', async () => {
    await request(app.getHttpServer())
      .post(endpoint)
      .send({ email: 'invalid-email', password: '' })
      .expect(400); 
  });
  */
});
