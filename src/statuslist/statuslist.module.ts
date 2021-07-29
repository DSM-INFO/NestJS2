import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StatusList } from 'src/entities/Statuslist.entity';
import { StatuslistController } from './statuslist.controller';
import { StatuslistService } from './statuslist.service';

@Module({
    imports: [TypeOrmModule.forFeature([StatusList])],
    controllers: [StatuslistController],
    providers: [StatuslistService],
})
export class StatuslistModule { }
