import { Module } from '@nestjs/common';
import { GameHistoriesService } from './game-histories.service';
import { GameHistoriesController } from './game-histories.controller';
import { ChildrenModule } from 'src/children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [GameHistoriesController],
  providers: [GameHistoriesService],
  exports: [GameHistoriesService],
})
export class GameHistoriesModule {}
