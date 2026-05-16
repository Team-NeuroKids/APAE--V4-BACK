import { Global, Module } from '@nestjs/common';
import { GlobalGateway } from './gateway/global.gateway';

import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [GlobalGateway],
  exports: [GlobalGateway],
})
export class WebsocketModule {}
