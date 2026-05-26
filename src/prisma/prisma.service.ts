import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.getOrThrow<string>('DATABASE_URL');

    const pool = new Pool({
      connectionString,
      max: Number(configService.get('DB_POOL_MAX', 10)),
      idleTimeoutMillis: Number(configService.get('DB_IDLE_TIMEOUT', 30000)),
      connectionTimeoutMillis: Number(
        configService.get('DB_CONN_TIMEOUT', 2000),
      ),
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log:
        configService.get('NODE_ENV') === 'development'
          ? ['query', 'warn', 'error']
          : ['warn', 'error'],
    });

    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await Promise.allSettled([this.$disconnect(), this.pool.end()]);
  }
}
