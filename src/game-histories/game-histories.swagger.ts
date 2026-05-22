import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GameHistoryResponseDto, PaginatedGameHistoriesResponseDto } from './dto/list-game-histories-response.dto';

export class GameHistoriesSwagger {
  static createHistory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Salvar um novo histórico de jogo',
        description: 'Registra a pontuação e os dados de uma partida recém terminada.',
      }),
      ApiResponse({
        status: 201,
        description: 'Histórico salvo com sucesso.',
        type: GameHistoryResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
    );
  }

  static getGameHistoriesByChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar histórico de jogos de uma criança',
        description:
          'Retorna a lista paginada do histórico de jogos associados a uma criança específica. O usuário deve estar vinculado à criança.',
      }),
      ApiParam({
        name: 'childId',
        description: 'ID da criança',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de histórico retornada com sucesso.',
        type: PaginatedGameHistoriesResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Usuário não vinculado à criança.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
    );
  }

  static getGameHistoriesBySession() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar histórico de jogos de uma sessão',
        description:
          'Retorna a lista paginada do histórico de jogos gerados dentro de uma sessão específica. O usuário deve estar vinculado à criança da sessão.',
      }),
      ApiParam({
        name: 'sessionId',
        description: 'ID da sessão',
        type: 'string',
        example: 'cuid0987654321',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de histórico retornada com sucesso.',
        type: PaginatedGameHistoriesResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado.',
      }),
      ApiResponse({
        status: 404,
        description: 'Sessão não encontrada.',
      }),
    );
  }
}
