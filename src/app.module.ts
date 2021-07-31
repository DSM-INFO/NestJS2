import { JwtStrategy } from './middleware/jwt.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CommentlistModule } from './commentlist/commentlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './middleware/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'eogus2513',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    AdminModule,
    UserModule,
    CommentlistModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
