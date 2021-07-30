import { User } from './../entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(
        private readonly UserService: UserService,
    ) { }

    @Post('signup')
    async signup(@Body() data: User) {
        return await this.UserService.signup(data);
    }

    @Post('login')
    async login(@Body() data) {
        return await this.UserService.login(data);
    }
}
