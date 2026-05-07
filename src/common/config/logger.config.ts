import { Params } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../auth/types';

export const getLoggerConfig = (configService: ConfigService): Params => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  return {
    pinoHttp: {
      redact: {
        paths: ['req.headers.authorization', 'req.body.password'],
        censor: '[CENSURADO_POR_SEGURANCA]',
      },
      genReqId: (req) => req.headers['x-request-id'] || randomUUID(),
      customProps: (req: any) => {
        const user = req.user as JwtPayload;
        return {
          userId: user?.sub || 'anonymous',
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
