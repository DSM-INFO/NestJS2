import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/entities/auth.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private AdminRepository: Repository<Admin>,
        @InjectRepository(Auth) private AuthRepository: Repository<Auth>,
    ) { }

    async getAdmin(ID): Promise<Admin> {
        const admin = await this.AdminRepository.findOne({ where: { ID } });
        if (!admin) {
            throw new BadRequestException('관리자가 존재하지 않습니다.');
        }
        return await this.AdminRepository.findOne({ where: { ID } });
    }

    async removeUser(id) {
        const user = await this.AuthRepository.findOne({ where: { id } });
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 유저입니다.');
        }
        await this.AuthRepository.delete(id);
    }
}
