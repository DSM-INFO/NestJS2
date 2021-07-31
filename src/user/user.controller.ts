import { JwtAuthGuard } from './../middleware/jwt.guard';
import { User } from './../entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Patch, Post, Param, UseGuards, Request } from '@nestjs/common';

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
        return this.UserService.login(data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async updateUser(@Param('id') id: string, @Body() data: User) {
        return await this.UserService.updateUser(id, data);
    }

    /*
    @Patch('status')
    async updateStatus(@Body() data: any) {
        return await this.UserService.updateStatus(data);
    }
    */
}
