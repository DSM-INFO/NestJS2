import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'DSM "Info" 동아리 프로젝트입니다.';
  }
}
