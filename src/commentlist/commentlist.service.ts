import { JwtService } from '@nestjs/jwt';
import { CommentList } from '../entities/commentlist.entity';
import { Injectable, Logger, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentlistService {
    constructor(
        @InjectRepository(CommentList) private CommentListRepository: Repository<CommentList>,
        private jwtService: JwtService,
    ) { }
    private logger = new Logger();

    //
    async getlist() {
        const list = await this.CommentListRepository.find();
        if (!list) {
            throw new NotFoundException();
        }
        return list;
    };

    async create(req) {
        if (!req.title || !req.content || !req.num) {
            throw new BadRequestException();
        }
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        return await this.CommentListRepository.save({
            title: req.body.title,
            content: req.body.content,
            writer: writer.name
        });
    }

    //보류
    async check(data, req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        if (!data.num) {
            throw new NotFoundException();
        }
        if (!data.title || !data.content) {
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

    async update(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        if (!req.num || !req.title || !req.content) {
            throw new BadRequestException();
        }
        const post = await this.CommentListRepository.findOne(req.num);
        if (post === undefined) {
            throw new NotFoundException();
        }
        if (writer.name !== post.writer || !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        this.CommentListRepository.update(
            {
                num: req.num
            },
            {
                title: req.title,
                content: req.content
            },
        );
        return {
            'status': 200
        };
    };

    async remove(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        const post = await this.CommentListRepository.findOne(req.num);
        if (post === undefined) {
            throw new NotFoundException();
        }
        if (writer.name !== post.writer || !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        await this.CommentListRepository.delete(req.num);
        return {
            'status': 200
        };
    };

    //복호화
    private async bearertoken(bearerToken): Promise<any> {
        const tokenString = bearerToken.split(' ')[1];
        const writer = await this.jwtService.verifyAsync(tokenString);
        return writer;
    }
}
