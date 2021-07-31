import { JwtAuthGuard } from './../middleware/jwt.guard';
import { CommentList } from '../entities/commentlist.entity';
import { CommentlistService } from './commentlist.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

@Controller('list')
export class CommentlistController {
    constructor(
        private readonly CommentlistService: CommentlistService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getlist() {
        return await this.CommentlistService.getlist();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Req() req) {
        return await this.CommentlistService.create(req);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('')
    async update(@Req() req) {
        return await this.CommentlistService.update(req);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    async remove(@Req() req) {
        return await this.CommentlistService.remove(req);
    }
}
