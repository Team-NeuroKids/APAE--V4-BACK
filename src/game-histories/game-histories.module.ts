import { Module } from '@nestjs/common';
import { GameHistoriesService } from './game-histories.service';
import { GameHistoriesController } from './game-histories.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ChildrenModule } from 'src/children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [GameHistoriesController],
  providers: [GameHistoriesService, PrismaService],
  exports: [GameHistoriesService],
})
export class GameHistoriesModule {}
