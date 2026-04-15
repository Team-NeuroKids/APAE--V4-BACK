import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import type { CreateUserInput, CreateUserOutput, GetUserInput, GetUserOutput } from "src/typings/user.types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() input: CreateUserInput): Promise<CreateUserOutput> {
        return await this.userService.createUser(input);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async listUsers(): Promise<GetUserOutput[]> {
        return await this.userService.listUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param() input: GetUserInput): Promise<GetUserOutput> {
        return await this.userService.getUser(input);
    }
}
