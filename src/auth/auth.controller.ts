import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInInput, SignInOutput } from "src/typings/auth.types";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() input: SignInInput): Promise<SignInOutput> {
        return await this.authService.signIn(input);
    }
}
