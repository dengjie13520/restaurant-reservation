import { Controller, Get } from '@nestjs/common';


@Controller()
export class ReservationController {
  constructor() {}

  @Get('reservation')
  getHello(): string {
    return 'ok';
  }
}
