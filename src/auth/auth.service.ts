import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { SignInInput, SignInOutput } from "src/typings/auth.types";
import { compare_password } from "src/libs/utils";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn({ email, password }: SignInInput): Promise<SignInOutput> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await compare_password(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        
        const { password: _, ...userWithoutPassword } = user;

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: userWithoutPassword as any,
        };
    }
}
