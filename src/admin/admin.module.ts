import { User } from './../entities/user.entity';
import { Admin } from './../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/middleware/constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
