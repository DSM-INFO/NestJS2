import { JwtAuthGuard } from './../middleware/jwt.guard';
import { CommentList } from './../entities/commentlist.entity';
import { CommentlistService } from './commentlist.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('list')
export class CommentlistController {
    constructor(
        private readonly CommentlistService: CommentlistService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':num')
    async getlist(@Param('num') num: number) {
        return await this.CommentlistService.getlist(num);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() data: CommentList) {
        return await this.CommentlistService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':num')
    async update(@Param('num') num: number, @Body() data: CommentList) {
        return await this.CommentlistService.update(num, data.title, data.content);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':num')
    async remove(@Param('num') num: number) {
        return await this.CommentlistService.remove(num);
    }
}
