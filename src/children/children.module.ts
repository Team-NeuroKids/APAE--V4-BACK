import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [ChildrenService, PrismaService],
  controllers: [ChildrenController],
})
export class ChildrenModule {}
