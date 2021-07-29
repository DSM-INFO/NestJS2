import { StatuslistService } from './statuslist.service';
import { Controller } from '@nestjs/common';

@Controller('statuslist')
export class StatuslistController {
    constructor(
        private StatuslistService: StatuslistService,
    ) { }
}
