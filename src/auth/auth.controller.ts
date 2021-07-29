import { AuthService } from './auth.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { Auth } from 'src/entities/auth.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private AuthService: AuthService,
    ) { }

    // status와 date만 저장. (출석)
    // 수정이 필요함.
    @Post(':id')
    async check(@Param('id') id: Auth, @Body() data: Auth): Promise<Auth> {
        return await this.AuthService.check(id, data);
    }
}
