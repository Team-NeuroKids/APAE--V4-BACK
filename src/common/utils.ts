import { hash, compare } from 'bcryptjs';
import { env } from './config/env.config';

export async function hash_password(password: string): Promise<string> {
  return await hash(password, env.BCRYPT_ROUNDS);
}

export async function compare_password(
  password: string,
  hash: string,
): Promise<boolean> {
  return await compare(password, hash);
}
