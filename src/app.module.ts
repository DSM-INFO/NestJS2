import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatuslistModule } from './statuslist/statuslist.module';
import { CommentlistModule } from './commentlist/commentlist.module';


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
      synchronize: false,
      logging: true
    }),
    AdminModule,
    AuthModule,
    StatuslistModule,
    CommentlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
