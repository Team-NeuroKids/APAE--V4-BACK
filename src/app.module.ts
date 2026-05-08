import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { CommonModule } from './common/common.module';
import { validate } from './common/config/env.validation'
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    CommonModule,
    UserModule,
    AuthModule,
    ChildrenModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
