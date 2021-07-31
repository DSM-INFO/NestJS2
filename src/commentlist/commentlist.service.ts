import { CommentList } from '../entities/Commentlist.entity';
import { Injectable, Logger, BadRequestException, NotFoundException, UnauthorizedException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { timeStamp } from 'console';

@Injectable()
export class CommentlistService {
    constructor(
        @InjectRepository(CommentList) private CommentListRepository: Repository<CommentList>,
    ) { }
    private logger = new Logger();

    //
    async getlist(num: number) {
        const post = await this.CommentListRepository.findOne({ where: { num } });
        if (!post) {
            this.logger.log('num information is Not Found!');
            throw new NotFoundException();
        }
        return {
            'num': post.num,
            'tltie': post.title,
            'content': post.content
        };
    };

    async create(data: CommentList) {
        return await this.CommentListRepository.save(data);
    }

    async check(data: CommentList) {
        if (!data.num) {
            this.logger.log('num is Not Found');
            throw new NotFoundException();
        }
        if (!data.title || !data.content) {
            this.logger.log('title & content is Not Found!');
            throw new BadRequestException();
        }
        await this.CommentListRepository.save({
            title: data.title,
            content: data.content
        });
        return {
            'status': 200,
            'title': data.title,
            'content': data.content
        };
    };

    async update(num, title, content) {
        if (!num) {
            this.logger.log('num is Not Found!');
        }
        if (!title || !content) {
            this.logger.log('title & content is Not Found!');
            throw new BadRequestException();
        }
        this.CommentListRepository.update(
            {
                num: num
            },
            {
                title: title,
                content: content
            },
        );
        return {
            'status': 200
        };
    };

    async remove(num: number) {
        const x = await this.CommentListRepository.findOne(num);
        if (!x) {
            this.logger.log('num is Not Found!');
            throw new BadRequestException();
        };
        await this.CommentListRepository.delete(num);
        return {
            'status': 200
        };
    };
}
