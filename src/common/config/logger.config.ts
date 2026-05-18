import { Params } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '../../auth/types';

export const getLoggerConfig = (configService: ConfigService): Params => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  return {
    pinoHttp: {
      redact: {
        paths: ['req.headers.authorization', 'req.body.password'],
        censor: '[BLOCKED]',
      },
      genReqId: (req) => req.headers['x-request-id'] || randomUUID(),
      customProps: (req: any) => {
        const user = req.user as AuthUser;
        return {
          userId: user?.id || 'anonymous',
          userRole: user?.role || 'none',
        };
      },
      transport: !isProduction
        ? {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              colorize: true,
            },
          }
        : undefined,
    },
  };
};
