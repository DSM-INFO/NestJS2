import { JwtStrategy } from './../middleware/jwt.strategy';
import { CommentList } from '../entities/Commentlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentlistController } from './commentlist.controller';
import { CommentlistService } from './commentlist.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/middleware/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentList]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [CommentlistController],
  providers: [CommentlistService, JwtStrategy]
})
export class CommentlistModule { }
