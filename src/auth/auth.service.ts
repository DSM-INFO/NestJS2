import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private AuthRepository: Repository<Auth>,
    ) { }

    async check(id, data): Promise<Auth> {
        return await this.AuthRepository.save({
            status: data.status,
            id: id
        });
    }
}