import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';

// --- MOCKS ---

const mockApp = {
  useGlobalPipes: jest.fn(),
  setGlobalPrefix: jest.fn(),
  listen: jest.fn().mockResolvedValue(null), // Simula que a porta está ouvindo
  get: jest.fn(), // Necessário se você usar app.get(...)
  useLogger: jest.fn(),
  bufferLogs: false, // Propriedade usada no teste de produção
};

const mockCreate = jest.fn().mockImplementation(() => Promise.resolve(mockApp));
const mockSetupGlobalServices = jest.fn();
const mockCreateDocument = jest.fn();
const mockCreateValidationPipe = jest.fn().mockReturnValue({}); // Retorna um objeto para useGlobalPipes

// --- CONFIGURAÇÃO DO JEST ---

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: mockCreate,
  },
  BaseExceptionFilter: class MockBaseExceptionFilter {
    catch = jest.fn();
  },
  Catch: () => () => {},
  ArgumentsHost: class MockArgumentsHost {},
}));

jest.mock('@infra/docs', () => ({ createDocument: jest.fn() }));
jest.mock('@infra/logger/config', () => ({
  setupGlobalServices: jest.fn(),
}));
jest.mock('@infra/config/validation/validation.pipe', () => ({
  createValidationPipe: jest.fn().mockReturnValue({}),
}));

const originalEnv = process.env;

// --- SUÍTE DE TESTES ---

describe('bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // Teste 1: Configuração padrão (Desenvolvimento)
  it('should create the Nest application and apply global configurations in development', async () => {
    process.env.PORT = '4000';
    process.env.NODE_ENV = 'development';

    await bootstrap();

    const expectedPrefix = 'api/v1';

    expect(mockCreate).toHaveBeenCalledWith(AppModule, { bufferLogs: false });

    expect(mockCreateValidationPipe).toHaveBeenCalledTimes(1);
    expect(mockApp.useGlobalPipes).toHaveBeenCalledTimes(1);

    expect(mockSetupGlobalServices).toHaveBeenCalledWith(mockApp);
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith(expectedPrefix);

    expect(mockCreateDocument).toHaveBeenCalledWith(mockApp);

    expect(mockApp.listen).toHaveBeenCalledWith('4000', '0.0.0.0');
  });

  // Teste 2: Ambiente de Produção (bufferLogs: true)
  it('should set bufferLogs to true in production environment', async () => {
    process.env.NODE_ENV = 'production';

    await bootstrap();

    expect(mockCreate).toHaveBeenCalledWith(AppModule, { bufferLogs: true });
    expect(mockApp.listen).toHaveBeenCalledWith('3000', '0.0.0.0');
  });

  // Teste 3: Fallback da Porta
  it('should use default port 3000 if PORT environment variable is not set', async () => {
    delete process.env.PORT;
    process.env.NODE_ENV = 'development';

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(3000, '0.0.0.0');
    expect(mockCreate).toHaveBeenCalledWith(AppModule, { bufferLogs: false }); // Não é prod
  });
});
