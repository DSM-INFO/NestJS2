import { CommentList } from './../entities/Commentlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentlistController } from './commentlist.controller';
import { CommentlistService } from './commentlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommentList])],
    controllers: [CommentlistController],
    providers: [CommentlistService],
})
export class CommentlistModule { }
