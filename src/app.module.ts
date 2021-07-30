import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CommentlistModule } from './commentlist/commentlist.module';
import { StatuslistModule } from './statuslist/statuslist.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    UserModule,
    CommentlistModule,
    StatuslistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
