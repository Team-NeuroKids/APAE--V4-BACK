import { Global, Module } from '@nestjs/common';
import { GlobalGateway } from './gateway/global.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { GameHistoriesModule } from 'src/game-histories/game-histories.module';
import { PresenceModule } from 'src/presence/presence.module';

@Global()
@Module({
  imports: [AuthModule, GameHistoriesModule, PresenceModule],
  providers: [GlobalGateway],
  exports: [GlobalGateway],
})
export class WebsocketModule {}
