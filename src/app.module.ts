import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';

import { ActionLogsModule } from './actions/action-logs/action-logs.module';
import { ActionCardsModule } from './actions/action-cards/action-cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ChildrenModule,
    ActionLogsModule,
    ActionCardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
