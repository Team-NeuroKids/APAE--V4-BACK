import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UtilsService {
  constructor(private configService: ConfigService) {}

  async hash_password(password: string): Promise<string> {
    return await hash(
      password,
      this.configService.getOrThrow<number>('BCRYPT_ROUNDS'),
    );
  }

  async compare_password(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
