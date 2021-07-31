import { User } from './../entities/user.entity';
import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        private JwtService: JwtService,
    ) { }
    private logger = new Logger();

    async signup(data: User) {
        if (!data.id || !data.name || !data.grade || !data.password) {
            this.logger.log('id && name && grade && password is Not Found!');
            throw new UnauthorizedException();
        }
        const user = await this.UserRepository.findOne({ id: data.id });
        if (user) {
            this.logger.log('Users who already exist')
            throw new BadRequestException();
        }
        const hashedpassword = await hash(data.password, 12);
        await this.UserRepository.save({
            id: data.id,
            name: data.name,
            grade: data.grade,
            password: hashedpassword
        });
        return {
            "status": 200
        }
    };

    async login(data) {
        if (!data.id || !data.password) {
            this.logger.log('id && password is Not Found!');
            throw new UnauthorizedException()
        }
        const user = await this.UserRepository.findOne({ id: data.id });
        if (!user) {
            this.logger.log('User is Not Found!');
            throw new NotFoundException();
        }
        await this.verifyPassword(data.password, user.password);

        const jwt = await this.JwtService.signAsync({
            uid: user.uid,
            id: user.id,
            name: user.name,
            grade: user.grade
        });
        return {
            "status": 200,
            "access_token": jwt
        };
    };

    //ligin
    private async verifyPassword(
        plainPassword: string,
        hashedpassword: string,
    ): Promise<any> {
        const isPasswordMatch = await compare(plainPassword, hashedpassword);
        if (!isPasswordMatch) {
            this.logger.log('Passwords do not match');
            throw new ForbiddenException();
        }
    }

    async updateUser(id: string, data: User) {
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.log('id is Not Found!');
            throw new BadRequestException();
        }
        if (!data.id || !data.name || !data.grade) {
            this.logger.log('id & name & grade is Not Found!');
        }
        await this.UserRepository.update(
            {
                id: id
            },
            {
                id: data.id,
                name: data.name,
                grade: data.grade
            },
        );
        return {
            'status': 200
        };
    };

    //보류
    /*
    async updateStatus(data: any) {
        if (!data) {
            this.logger.log('data is Not Found!');
            throw new BadRequestException();
        }
        await this.UserRepository.update(
            {
                
            },
            {

            }
            );
    }
    */
}