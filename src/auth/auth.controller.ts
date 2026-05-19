import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import type { SignInOutput } from 'src/auth/types';
import { SignInDto } from './dto/auth.dto';
import { AuthSwagger } from './auth.swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthSwagger.signIn()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() input: SignInDto): Promise<SignInOutput> {
    return await this.authService.signIn(input);
  }
}
