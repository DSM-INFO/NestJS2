import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StatusList } from 'src/entities/Statuslist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatuslistService {
    constructor(
        @InjectRepository(StatusList) private StatusListRepository: Repository<StatusList>,
    ) { }
}
