// src/filters/all-exceptions.filter.ts
import { Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DatabaseError } from '@shared/errors/internal-server';
import { IError } from '@shared/protocols/error.protocol';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Tratamento padrão para outros erros
    const statusCode = this.getStatusCode(exception);
    const errorType = this.getErrorType(exception);
    const message = this.getMessage(exception);

    this.logger.error(
      `HTTP Status: ${statusCode} | Error: ${message} | Path: ${request.url}`,
      (exception as Error)?.stack, // Captura o stack trace
    );

    let outputException: IError = exception as IError;
    if (errorType === 'DatabaseError') {
      outputException = new DatabaseError();
    }

    // Se for um erro de banco de dados, trata de forma específica
    // if (exception instanceof QueryError) {
    //   return this.handleDatabaseError(
    //     exception as QueryError & SequelizeError,
    //     response,
    //     request,
    //   );
    // }

    const error: any = {
      message: this.getMessage(outputException),
      code: outputException.fullCode,
    };

    if (process.env.NODE_ENV === 'development') {
      error.type = this.getErrorType(outputException);
      error.details = {
        stack: exception instanceof Error ? exception.stack : undefined,
      };
    }

    response.status(this.getStatusCode(outputException)).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });
  }

  // private handleDatabaseError(
  //   exception: QueryError & SequelizeError,
  //   response: Response,
  //   request: any,
  // ) {
  //   const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  //   const originalError = exception.original as MysqlError;

  //   response.status(statusCode).json({
  //     statusCode,
  //     timestamp: new Date().toISOString(),
  //     path: request.url,
  //     error: {
  //       type: 'DatabaseError',
  //       message: 'Database operation failed',
  //       details: {
  //         code: originalError?.code,
  //         sqlState: originalError?.sqlState,
  //         suggestion: 'Check database connection and credentials',
  //         // Mostra detalhes apenas em desenvolvimento
  //         ...(process.env.NODE_ENV === 'development' && {
  //           originalError: {
  //             name: exception.name,
  //             message: exception.message,
  //             sql: exception.sql,
  //             ...(originalError && {
  //               code: originalError.code,
  //               sqlState: originalError.sqlState,
  //             }),
  //           },
  //         }),
  //       },
  //     },
  //   });
  // }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof Error && 'status' in exception) {
      return (exception as any).status || HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof Error) {
      return exception.message;
    }
    return 'Internal server error';
  }

  private getErrorType(exception: unknown): string {
    if (exception instanceof Error) {
      return exception.constructor.name;
    }
    return 'UnknownError';
  }
}
