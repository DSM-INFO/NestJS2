import { Admin } from './../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';


@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
