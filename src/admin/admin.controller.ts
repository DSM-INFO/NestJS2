import { AdminService } from './admin.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly AdminService: AdminService,
    ) { }

    @Post('login')
    async login(@Body() data) {
        return await this.AdminService.login(data);
    }

    @Post()
    async create(@Body() data) {
        return await this.AdminService.create(data);
    }
}
