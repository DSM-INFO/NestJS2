import { User } from './../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private AdminRepository: Repository<Admin>,
        private JwtService: JwtService,
    ) { }
    private logger = new Logger();

    async login(data) {
        if (!data.ID || !data.password) {
            throw new UnauthorizedException()
        }
        const user = await this.AdminRepository.findOne({ ID: data.ID });
        if (!user) {
            throw new NotFoundException();
        }
        await this.verifyPassword(data.password, user.password);

        const jwt = await this.JwtService.signAsync({
            id: user.ID,
            name: user.name,
            isAdmin: user.isAdmin
        });
        return {
            "status": 200,
            "access_token": jwt
        };
    };

    // password복호화
    private async verifyPassword(
        plainPassword: string,
        hashedpassword: string,
    ): Promise<any> {
        const isPasswordMatch = await compare(plainPassword, hashedpassword);
        if (!isPasswordMatch) {
            throw new ForbiddenException();
        }
    }
    /*
    async create(data) {
        const hashedpassword = await hash(data.password, 12);
        await this.AdminRepository.save({
            ID: data.ID,
            name: data.name,
            isAdmin: data.isAdmin,
            password: hashedpassword
        })
    }*/
}
