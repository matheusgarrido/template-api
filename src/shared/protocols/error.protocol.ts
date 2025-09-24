export abstract class IError extends Error {
  public readonly fullCode: string;

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errorCode: number,
  ) {
    super(message);
    this.fullCode = `${statusCode}-${errorCode.toString().padStart(5, '0')}`;
  }
}

export abstract class NotFoundError extends IError {
  constructor(message: string, errorCode: number) {
    super(message, 404, errorCode);
  }
}
export abstract class ConflictError extends IError {
  constructor(message: string, errorCode: number) {
    super(message, 409, errorCode);
  }
}

export abstract class InternalServerError extends IError {
  constructor(message: string, errorCode: number) {
    super(message, 500, errorCode);
  }
}
