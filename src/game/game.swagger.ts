import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameResponseDto } from './dto/game-response.dto';

export class GameSwagger {
  static createGame() {
    return applyDecorators(
      ApiOperation({
        summary: 'Criar novo jogo',
        description:
          'Cadastra um novo jogo no sistema. Apenas administradores.',
      }),
      ApiBody({
        type: CreateGameDto,
        description: 'Dados do jogo a ser criado',
      }),
      ApiResponse({
        status: 201,
        description: 'Jogo criado com sucesso.',
        type: GameResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores (ADMIN).',
      }),
    );
  }

  static getGames() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar todos os jogos',
        description: 'Retorna a lista de todos os jogos cadastrados.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de jogos retornada com sucesso.',
        type: [GameResponseDto],
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
    );
  }

  static getGameById() {
    return applyDecorators(
      ApiOperation({
        summary: 'Obter detalhes de um jogo',
        description: 'Retorna os detalhes de um jogo específico pelo seu ID.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do jogo',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Detalhes do jogo retornados com sucesso.',
        type: GameResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 404,
        description: 'Jogo não encontrado.',
      }),
    );
  }

  static updateGame() {
    return applyDecorators(
      ApiOperation({
        summary: 'Atualizar dados de um jogo',
        description:
          'Atualiza as informações de um jogo existente. Apenas administradores.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do jogo a ser atualizado',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiBody({
        type: UpdateGameDto,
        description: 'Dados do jogo para atualização',
      }),
      ApiResponse({
        status: 200,
        description: 'Jogo atualizado com sucesso.',
        type: GameResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores.',
      }),
      ApiResponse({
        status: 404,
        description: 'Jogo não encontrado.',
      }),
    );
  }

  static deleteGame() {
    return applyDecorators(
      ApiOperation({
        summary: 'Remover jogo (Soft Delete)',
        description:
          'Realiza a remoção lógica de um jogo. Apenas administradores.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do jogo a ser removido',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Jogo removido com sucesso.',
        type: GameResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores.',
      }),
      ApiResponse({
        status: 404,
        description: 'Jogo não encontrado.',
      }),
    );
  }

  static restoreGame() {
    return applyDecorators(
      ApiOperation({
        summary: 'Restaurar jogo removido',
        description:
          'Restaura um jogo que havia sido removido logicamente. Apenas administradores.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do jogo a ser restaurado',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Jogo restaurado com sucesso.',
        type: GameResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores.',
      }),
      ApiResponse({
        status: 404,
        description: 'Jogo não encontrado.',
      }),
    );
  }
}
