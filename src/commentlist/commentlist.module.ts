import { JwtStrategy } from './../middleware/jwt.strategy';
import { CommentList } from './../entities/commentlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentlistController } from './commentlist.controller';
import { CommentlistService } from './commentlist.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/constants';

@Module({
  imports: [TypeOrmModule.forFeature([CommentList])],
  controllers: [CommentlistController],
  providers: [CommentlistService, JwtStrategy]
})
export class CommentlistModule { }
