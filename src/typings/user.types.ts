export interface CreateUserInput {
    name: string;
    email: string;
    cpf: string;
    password: string;
    role: string;
}

export interface CreateUserOutput {
    id: string;
}

export interface GetUserInput {
    id: string;
}

export interface GetUserOutput {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}