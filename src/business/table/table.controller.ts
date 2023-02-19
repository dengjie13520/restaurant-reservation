import { Controller, Get } from '@nestjs/common';


@Controller()
export class TableController {
  constructor() {}

  @Get('table')
  getHello(): string {
    return 'ok';
  }
}
