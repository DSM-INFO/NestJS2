import { JwtService } from '@nestjs/jwt';
import { CommentList } from '../entities/commentlist.entity';
import { Injectable, Logger, BadRequestException, NotFoundException, UnauthorizedException, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import console from 'console';

@Injectable()
export class CommentlistService {
    constructor(
        @InjectRepository(CommentList) private CommentListRepository: Repository<CommentList>,
        private jwtService: JwtService,
    ) { }
    private logger = new Logger(); // 나중에 시간이 날떄 Logger정리

    async getlist() {
        const list = await this.CommentListRepository.find();
        if (!list) {
            throw new NotFoundException();
        }
        return list;
    }

    async create(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        if (!req.body.title || !req.body.content) {
            throw new BadRequestException();
        }
        return await this.CommentListRepository.save({
            title: req.body.title,
            content: req.body.content,
            writer: writer.name
        });
    }

    async update(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        // writer
        if (!req.body.num ||!req.body.title || !req.body.content) {
            throw new BadRequestException();
        }
        const post = await this.CommentListRepository.findOne(req.body.num);
        if (writer.name !== post.writer && !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        if (post === undefined) {
            throw new NotFoundException();
        }
        this.CommentListRepository.update(
            {
                num: req.body.num
            },
            {
                writer: writer.name,
                title: req.body.title,
                content: req.body.content
            },
        );
        return {
            'status': 200
        };
    };

    async delete(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        const post = await this.CommentListRepository.findOne(req.body.num);
        if (!req.body.num) {
            throw new BadRequestException();
        }
        if (writer.name !== post.writer && !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        if (post === undefined) {
            throw new NotFoundException();
        }
        await this.CommentListRepository.delete(req.body.num);
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
