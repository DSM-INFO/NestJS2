import { JwtAuthGuard } from './../middleware/jwt.guard';
import { User } from './../entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Patch, Post, UseGuards, Req, Delete } from '@nestjs/common';

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
    @Patch('update')
    async updateUser(@Req() req) {
        return await this.UserService.updateUser(req);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async DeleteUser(@Req() req) {
        return await this.UserService.deleteUser(req);
    }

    /*
    @Patch('status')
    async updateStatus(@Body() data: any) {
        return await this.UserService.updateStatus(data);
    }
    */
}
