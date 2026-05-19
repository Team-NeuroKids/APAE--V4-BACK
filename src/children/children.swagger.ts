import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildResponseDto } from './dto/child-response.dto';
import { PaginatedChildsResponseDto } from './dto/list-childs-response.dto';
import { AddResponsibleToChildDto } from './dto/add-responsible-to-child.dto';

export class ChildrenSwagger {
  static createChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Cadastrar nova criança',
        description:
          'Cria o registro de uma nova criança e vincula automaticamente o médico autenticado como responsável.',
      }),
      ApiBody({
        type: CreateChildDto,
        description: 'Dados da criança a ser cadastrada',
      }),
      ApiResponse({
        status: 201,
        description: 'Criança cadastrada com sucesso.',
        type: ChildResponseDto,
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
        description:
          'Acesso negado. Apenas usuários com perfil de médico (DOCTOR) podem realizar esta ação.',
      }),
      ApiResponse({
        status: 409,
        description: 'Conflito de dados (ex: CPF já cadastrado no sistema).',
      }),
    );
  }

  static getChildren() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar todas as crianças (Admin)',
        description:
          'Retorna a lista paginada de todas as crianças cadastradas no sistema. Paginação baseada em cursor.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de crianças retornada com sucesso.',
        type: PaginatedChildsResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas usuários com perfil de administrador (ADMIN) podem realizar esta ação.',
      }),
    );
  }

  static getChildrenByUser() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar crianças do usuário autenticado',
        description:
          'Retorna a lista paginada de crianças que estão vinculadas ao médico ou cuidador autenticado.',
      }),
      ApiResponse({
        status: 200,
        description:
          'Lista paginada de crianças vinculadas retornada com sucesso.',
        type: PaginatedChildsResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Requer perfil de médico (DOCTOR) ou cuidador (CAREGIVER).',
      }),
    );
  }

  static getChildById() {
    return applyDecorators(
      ApiOperation({
        summary: 'Obter detalhes de uma criança',
        description:
          'Retorna os dados detalhados de uma criança específica pelo seu ID. O usuário autenticado deve estar vinculado à criança.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da criança (CUID/UUID)',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Detalhes da criança retornados com sucesso.',
        type: ChildResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Requer perfil de médico (DOCTOR) ou cuidador (CAREGIVER).',
      }),
      ApiResponse({
        status: 404,
        description:
          'Paciente não encontrado ou acesso negado (usuário não vinculado à criança).',
      }),
    );
  }

  static updateChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Atualizar dados de uma criança',
        description:
          'Atualiza as informações de um registro de criança existente. Apenas o médico vinculado à criança pode realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da criança a ser atualizada',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiBody({
        type: UpdateChildDto,
        description: 'Dados da criança para atualização',
      }),
      ApiResponse({
        status: 200,
        description: 'Dados da criança atualizados com sucesso.',
        type: ChildResponseDto,
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
        description:
          'Acesso negado. Apenas médicos vinculados à criança podem realizar esta alteração.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
      ApiResponse({
        status: 409,
        description:
          'Conflito de dados (ex: CPF já cadastrado para outra criança).',
      }),
    );
  }

  static deleteChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Remover criança (Soft Delete)',
        description:
          'Realiza a remoção lógica (soft delete) de uma criança. Apenas o médico vinculado à criança pode realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da criança a ser removida',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Criança removida com sucesso.',
        type: ChildResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas médicos vinculados à criança podem realizar esta ação.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
    );
  }

  static restoreChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Restaurar criança removida',
        description:
          'Restaura o registro de uma criança que havia sido removida logicamente (soft delete). Apenas administradores podem realizar esta ação.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da criança a ser restaurada',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Criança restaurada com sucesso.',
        type: ChildResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas usuários com perfil de administrador (ADMIN) podem realizar esta ação.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
    );
  }

  static addResponsibleToChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Vincular responsável à criança',
        description:
          'Adiciona um novo usuário (médico ou cuidador) como responsável pela criança. O usuário solicitante deve estar vinculado à criança.',
      }),
      ApiParam({
        name: 'childId',
        description: 'ID da criança',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiBody({
        type: AddResponsibleToChildDto,
        description: 'ID do responsável a ser vinculado',
      }),
      ApiResponse({
        status: 201,
        description: 'Responsável vinculado à criança com sucesso.',
        type: ChildResponseDto,
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
        description:
          'Acesso negado. Apenas responsáveis já vinculados à criança podem adicionar novos responsáveis.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança ou responsável fornecido não encontrado.',
      }),
      ApiResponse({
        status: 409,
        description:
          'Conflito: O responsável já está vinculado a esta criança.',
      }),
    );
  }

  static removeResponsibleFromChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Remover vínculo de responsável da criança',
        description:
          'Remove a associação entre um responsável e a criança. Garante a regra de negócio de que a criança mantenha pelo menos um médico e um cuidador vinculados.',
      }),
      ApiParam({
        name: 'childId',
        description: 'ID da criança',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiParam({
        name: 'responsibleId',
        description: 'ID do responsável a ser desvinculado',
        type: 'string',
        example: 'cuid0987654321',
      }),
      ApiResponse({
        status: 200,
        description: 'Vínculo do responsável removido com sucesso.',
        type: ChildResponseDto,
      }),
      ApiResponse({
        status: 400,
        description:
          'Ação bloqueada. A criança deve ter pelo menos um médico ou cuidador vinculado.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas responsáveis vinculados à criança podem remover vínculos.',
      }),
      ApiResponse({
        status: 404,
        description:
          'Criança não encontrada ou o responsável já não está vinculado a ela.',
      }),
    );
  }
}
