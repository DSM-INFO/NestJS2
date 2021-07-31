import { User } from './../entities/user.entity';
import { AdminService } from './admin.service';
import { Body, Controller, Patch, Post, Param, Delete } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly AdminService: AdminService,
    ) { }

    @Post('login')
    async login(@Body() data) {
        return await this.AdminService.login(data);
    }

    /*
    @Post()
    async create(@Body() data) {
        return await this.AdminService.create(data);
    }*/

    @Patch('update/:id')
    async updateUser(@Param('id') id: string, @Body() data: User) {
        return await this.AdminService.updateUser(id, data);
    }

    @Delete('delete/:id')
    async removeUser(@Param('id') id: string) {
        return await this.AdminService.remove(id);
    }
}
