import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/auth.dto';

export class AuthSwagger {
  static signIn() {
    return applyDecorators(
      ApiOperation({
        summary: 'Autenticação do usuário (Login)',
        description:
          'Realiza o login do usuário e retorna o token de acesso (JWT) e os dados do usuário.',
      }),
      ApiBody({
        type: SignInDto,
        description: 'Credenciais de acesso',
      }),
      ApiResponse({
        status: 200,
        description: 'Login efetuado com sucesso.',
        schema: {
          type: 'object',
          properties: {
            access_token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'cuid1234567890' },
                name: { type: 'string', example: 'João' },
                email: { type: 'string', example: 'user@example.com' },
                cpf: { type: 'string', example: '18765210077' },
                role: { type: 'string', example: 'ADMIN' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                deleted_at: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                },
              },
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Credenciais inválidas.',
      }),
    );
  }
}
