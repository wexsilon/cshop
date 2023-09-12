import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'simple route test that server is alive.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
