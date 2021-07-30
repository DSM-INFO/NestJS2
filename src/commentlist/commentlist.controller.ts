import { CommentList } from './../entities/commentlist.entity';
import { CommentlistService } from './commentlist.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('list')
export class CommentlistController {
    constructor(
        private readonly CommentlistService: CommentlistService
    ) { }

    @Post()
    async check(@Body() data: CommentList) {
        return await this.CommentlistService.check(data);
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
