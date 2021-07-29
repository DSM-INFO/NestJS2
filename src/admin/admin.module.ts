import { Auth } from 'src/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    TypeOrmModule.forFeature([Auth]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
