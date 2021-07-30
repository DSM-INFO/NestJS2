import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
