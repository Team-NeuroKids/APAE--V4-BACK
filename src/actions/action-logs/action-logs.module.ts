import { Module } from '@nestjs/common';
import { ActionLogsService } from './action-logs.service';
import { PrismaService } from 'prisma/prisma.service';

import { ChildrenModule } from 'src/children/children.module';
import { ActionLogsController } from './action-logs.controller';

@Module({
  imports: [ChildrenModule],
  controllers: [ActionLogsController],
  providers: [ActionLogsService, PrismaService],
  exports: [ActionLogsService],
})
export class ActionLogsModule {}
