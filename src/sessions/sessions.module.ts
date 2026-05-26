import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ChildrenModule } from 'src/children/children.module';

@Module({
  imports: [AuthModule, ChildrenModule],
  providers: [SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
