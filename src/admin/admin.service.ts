import { User } from './../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private AdminRepository: Repository<Admin>,
        @InjectRepository(User) private UserRepository: Repository<User>,
        private JwtService: JwtService,
    ) { }
    private logger = new Logger();

    /*
    async create(data) {
        const hashedpassword = await hash(data.password, 12);
        return await this.AdminRepository.save({
            ID: data.ID,
            password: hashedpassword,
            isAdmin: data.isAdmin

        });
    }*/

    async login(data) {
        if (!data.ID || !data.password) {
            this.logger.log('ID && password is Not Found!');
            throw new UnauthorizedException()
        }
        const user = await this.AdminRepository.findOne({ ID: data.ID });
        console.log(user);
        if (!user) {
            this.logger.log('Admin is Not Found!');
            throw new NotFoundException();
        }
        if (!compare(data.password, user.password)) {
            this.logger.log('password is Wrong!');
            throw new ForbiddenException();
        }
        const jwt = await this.JwtService.signAsync({
            id: data.id,
            name: data.name,
            grade: data.grade
        });
        return {
            "status": 200,
            "access_token": jwt
        };
    };

    async updateUser(id: string, data: User) {
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.log('id is Not Found!');
            throw new BadRequestException();
        }
        if (!data.id || !data.name || !data.grade) {
            this.logger.log('id & name & grade is Not Found!');
            throw new BadRequestException();
        }
        await this.UserRepository.update(
            {
                id: id
            },
            {
                id: data.id,
                name: data.name,
                grade: data.grade
            }
        )
        return {
            'status': 200
        }
    }

    async remove(id: string) {
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.log('user is Not Found!');
            throw new BadRequestException();
        }
        await this.UserRepository.delete({
            id: id
        });
        return {
            'status': 200
        }
    }
}
