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
          'Falha na restrição exclusiva. Um registro com este valor já existe.';
        break;

      case 'P2025': // Record not found
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = 'Registro não encontrado. O recurso solicitado não existe.';
        break;

      case 'P2003': // Foreign key constraint failed
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message =
          'Falha na restrição de chave estrangeira. Referência inválida a um registro relacionado.';
        break;

      case 'P2000': // Value too long
        status = HttpStatus.BAD_REQUEST;
        message = 'O valor fornecido é muito longo para esta coluna.';
        break;

      case 'P2006': // Invalid value
      case 'P2011': // Null constraint violation
      case 'P2014': // Relation violation
        status = HttpStatus.BAD_REQUEST;
        message =
          'A validação de dados falhou. Verifique os campos fornecidos.';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Erro no banco de dados: ${exception.message.replace(/\n/g, ' ')}`;
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
