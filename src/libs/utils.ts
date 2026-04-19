import { hash, compare } from "bcryptjs";

export async function hash_password(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function compare_password(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
}