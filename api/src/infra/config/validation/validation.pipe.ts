import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export const validationOptionsPipe: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors.map((err) => Object.values(err.constraints || {}));
    throw new BadRequestException(messages.flat());
  },
};

export function createValidationPipe() {
  return new ValidationPipe(validationOptionsPipe);
}
