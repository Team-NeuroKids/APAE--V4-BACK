import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInOutput } from 'src/auth/types';
import { UtilsService } from 'src/common/utils.service';
import { SignInDto } from './dto/auth.dto';
import { GetUserOutput } from 'src/user/types';
import { SessionJwtPayload } from 'src/auth/types';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utils: UtilsService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<SignInOutput> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await this.utils.compare_password(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const { password: _, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword as GetUserOutput,
    };
  }

  async verifyWsToken(tokenString?: string): Promise<SessionJwtPayload> {
    if (!tokenString) {
      throw new Error('Token não fornecido');
    }

    const payload =
      await this.jwtService.verifyAsync<SessionJwtPayload>(tokenString);

    return payload;
  }
}
