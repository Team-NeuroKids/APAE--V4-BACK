import { Module } from '@nestjs/common';
import { ActionLogsController } from './action-logs.controller';
import { ActionLogsService } from './action-logs.service';
import { PrismaService } from 'prisma/prisma.service';

import { ChildrenModule } from 'src/children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [ActionLogsController],
  providers: [ActionLogsService, PrismaService],
})
export class ActionLogsModule {}
