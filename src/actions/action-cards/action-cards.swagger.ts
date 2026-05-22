import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateActionCardDto } from './dto/create-action-card.dto';
import { UpdateActionCardDto } from './dto/update-action-cart.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { PaginatedCardsResponseDto } from './dto/list-cards-response.dto';

export class ActionCardsSwagger {
  static createActionCard() {
    return applyDecorators(
      ApiOperation({
        summary: 'Criar novo card de ação',
        description: 'Cria um novo card de ação associado a uma categoria específica.',
      }),
      ApiBody({
        type: CreateActionCardDto,
        description: 'Dados do card de ação a ser criado',
      }),
      ApiResponse({
        status: 201,
        description: 'Card criado com sucesso.',
        type: CardResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores (ADMIN) podem realizar esta ação.',
      }),
    );
  }

  static getAllCards() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar todos os cards',
        description: 'Retorna a lista paginada de cards de ação, permitindo filtro por label e categoria.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de cards retornada com sucesso.',
        type: PaginatedCardsResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
    );
  }

  static getCardById() {
    return applyDecorators(
      ApiOperation({
        summary: 'Obter detalhes de um card',
        description: 'Retorna os detalhes de um card específico buscando pelo seu ID.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do card (CUID/UUID)',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Detalhes do card retornados com sucesso.',
        type: CardResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 404,
        description: 'Card não encontrado.',
      }),
    );
  }

  static updateCard() {
    return applyDecorators(
      ApiOperation({
        summary: 'Atualizar dados de um card',
        description: 'Atualiza as informações de um card existente. Apenas administradores podem realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do card a ser atualizado',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiBody({
        type: UpdateActionCardDto,
        description: 'Dados do card para atualização',
      }),
      ApiResponse({
        status: 200,
        description: 'Card atualizado com sucesso.',
        type: CardResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores (ADMIN) podem realizar esta alteração.',
      }),
      ApiResponse({
        status: 404,
        description: 'Card não encontrado.',
      }),
    );
  }

  static deleteCard() {
    return applyDecorators(
      ApiOperation({
        summary: 'Remover card (Soft Delete)',
        description: 'Realiza a remoção lógica (soft delete) de um card. Apenas administradores podem realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do card a ser removido',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Card removido com sucesso.',
        type: CardResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores podem realizar esta ação.',
      }),
      ApiResponse({
        status: 404,
        description: 'Card não encontrado.',
      }),
    );
  }

  static restoreCard() {
    return applyDecorators(
      ApiOperation({
        summary: 'Restaurar card removido',
        description: 'Restaura um card que havia sido removido logicamente (soft delete). Apenas administradores podem realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do card a ser restaurado',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Card restaurado com sucesso.',
        type: CardResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas administradores podem realizar esta ação.',
      }),
      ApiResponse({
        status: 404,
        description: 'Card não encontrado.',
      }),
    );
  }
}
