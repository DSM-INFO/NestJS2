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
            throw new UnauthorizedException();
        }
        const user = await this.UserRepository.findOne({ id: data.id });
        if (user) {
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
            throw new UnauthorizedException()
        }
        const user = await this.UserRepository.findOne({ id: data.id });
        if (!user) {
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

    async updateUser(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        const post = await this.UserRepository.findOne(req.body.id);
        if (!req.body.id || !req.body.name || !req.body.grade) {
            throw new BadRequestException();
        }
        if (writer.id !== post.id || !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        if (post === undefined) {
            throw new NotFoundException();
        }
        await this.UserRepository.update(
            {
                id: req.body.id
            },
            {
                id: req.body.id,
                name: req.body.name,
                grade: req.body.grade
            },
        );
        return {
            'status': 200
        };
    };

    async deleteUser(req) {
        const bearerToken = req.headers.authorization;
        const writer = await this.bearertoken(bearerToken);
        const post = await this.UserRepository.findOne(req.body.id);
        if (!req.body.id || !req.body.name || !req.body.grade) {
            throw new BadRequestException();
        }
        if (writer.id !== post.id || !writer.isAdmin) {
            throw new UnauthorizedException();
        }
        if (post === undefined) {
            throw new NotFoundException();
        }
        await this.UserRepository.delete(req.id);
        return {
            'status': 200
        }
    }

    //ligin(password입증)
    private async verifyPassword(
        plainPassword: string,
        hashedpassword: string,
    ): Promise<any> {
        const isPasswordMatch = await compare(plainPassword, hashedpassword);
        if (!isPasswordMatch) {
            this.logger.log('Password do not match');
            throw new ForbiddenException();
        }
    }

    //복호화
    private async bearertoken(bearerToken): Promise<any> {
        const tokenString = bearerToken.split(' ')[1];
        const writer = await this.JwtService.verifyAsync(tokenString);
        return writer;
    }

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