import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor no banco de dados';

    switch (exception.code) {
      case 'P2002': // Unique constraint failed
        status = HttpStatus.CONFLICT;
        message =
          'Unique constraint failed. A record with this value already exists.';
        break;

      case 'P2025': // Record not found
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found. The requested resource does not exist.';
        break;

      case 'P2003': // Foreign key constraint failed
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message =
          'Foreign key constraint failed. Invalid reference to a related record.';
        break;

      case 'P2000': // Value too long
        status = HttpStatus.BAD_REQUEST;
        message = 'The provided value is too long for this column.';
        break;

      case 'P2006': // Invalid value
      case 'P2011': // Null constraint violation
      case 'P2014': // Relation violation
        status = HttpStatus.BAD_REQUEST;
        message = 'Data validation failed. Please check the provided fields.';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Database Error: ${exception.message.replace(/\n/g, ' ')}`;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: HttpStatus[status],
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
