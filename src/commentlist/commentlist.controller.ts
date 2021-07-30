import { JwtAuthGuard } from './../middleware/jwt.guard';
import { CommentList } from './../entities/commentlist.entity';
import { CommentlistService } from './commentlist.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('list')
export class CommentlistController {
    constructor(
        private readonly CommentlistService: CommentlistService
    ) { }

    @Get(':num')
    async getlist(@Param('num') num: number) {
        return await this.CommentlistService.getlist(num);
    }

    @Post('create')
    async create(@Body() data: CommentList) {
        return await this.CommentlistService.create(data);
    }

    @Patch(':num')
    async update(@Param('num') num: number, @Body() data: CommentList) {
        return await this.CommentlistService.update(num, data.title, data.content);
    }

    @Delete(':num')
    async remove(@Param('num') num: number) {
        return await this.CommentlistService.remove(num);
    }
}
