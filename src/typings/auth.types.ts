import { GetUserOutput } from "./user.types";

export interface SignInInput {
    email: string;
    password: string;
}

export interface SignInOutput {
    access_token: string;
    user: GetUserOutput;
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
