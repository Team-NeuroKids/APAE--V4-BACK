import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Prisma } from '@prisma/client';

@Catch()
export class AllWsExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(AllWsExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();

    const errorData = {
      status: 'error',
      message: 'Erro interno no servidor',
      details: null as unknown,
    };

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      errorData.message = 'Erro de requisição/validação';
      errorData.details =
        typeof response === 'object' &&
        response !== null &&
        'message' in response
          ? response.message
          : response;
    } else if (exception instanceof WsException) {
      errorData.message = exception.message;
      errorData.details = exception.getError();
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      errorData.message = 'Erro de conflito no banco de dados';
      errorData.details = { code: exception.code, meta: exception.meta };
    } else if (exception instanceof Error) {
      this.logger.error(
        `Unhandled WebSocket Exception: ${exception.message}`,
        exception.stack,
      );
      errorData.details =
        process.env.NODE_ENV === 'development'
          ? exception.message
          : 'Unexpected server error.';
    }

    client.emit('exception', errorData);
  }
}
