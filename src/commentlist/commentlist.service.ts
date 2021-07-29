import { CommentList } from './../entities/Commentlist.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentlistService {
    constructor(
        @InjectRepository(CommentList) private CommentListRepository: Repository<CommentList>,
    ) { }

    async createList(data: CommentList): Promise<CommentList> {
        return await this.CommentListRepository.save({
            title: data.title,
            content: data.content
        });
    };

    async removeList(num: CommentList) {
        await this.CommentListRepository.delete(num);
    }
}
