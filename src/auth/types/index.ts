import { GetUserOutput } from 'src/user/types';

export interface SignInOutput {
  access_token: string;
  user: GetUserOutput;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}
