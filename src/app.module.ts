import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { LoggerModule } from 'nestjs-pino';
import { getLoggerConfig } from './common/config/logger.config';
import { CommonModule } from './common/common.module';
import { validate } from './common/config/env.validation';
import { WebsocketModule } from './websocket/websocket.module';
import { PresenceModule } from './presence/presence.module';
import { GameModule } from './game/game.module';
import { SessionsModule } from './sessions/sessions.module';
import { GameHistoriesModule } from './game-histories/game-histories.module';
import { ActionLogsModule } from './actions/action-logs/action-logs.module';
import { ActionCardsModule } from './actions/action-cards/action-cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getLoggerConfig,
    }),
    CommonModule,
    UserModule,
    AuthModule,
    ChildrenModule,
    WebsocketModule,
    PresenceModule,
    GameModule,
    SessionsModule,
    GameHistoriesModule,
    ActionLogsModule,
    ActionCardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
