import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { validate } from './common/config/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ChildrenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
