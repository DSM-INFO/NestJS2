import { AdminService } from './admin.service';
import { Controller, Param, Get, Delete } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';

@Controller('admin')
export class AdminController {
    constructor(
        private AdminService: AdminService,
    ) { }

    @Get(':id')
    async getAdmin(@Param('id') ID: string): Promise<Admin> {
        return await this.AdminService.getAdmin(ID);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: string) {
        await this.AdminService.removeUser(id);
    }

}
