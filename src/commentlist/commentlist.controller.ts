import { CommentList } from './../entities/Commentlist.entity';
import { CommentlistService } from './commentlist.service';
import { Body, Controller, Post, Delete, Param } from '@nestjs/common';

@Controller('commentlist')
export class CommentlistController {
    constructor(
        private CommentlistService: CommentlistService,
    ) { }

    @Post()
    async createList(@Body() data: CommentList): Promise<CommentList> {
        return await this.CommentlistService.createList(data);
    }

    @Delete(':num')
    async removeList(@Param('num') num: CommentList) {
        await this.CommentlistService.removeList(num);
    }
}
