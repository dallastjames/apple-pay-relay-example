import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('applepayrelay')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('session/start')
  public async sessionStart(@Body() body: any): Promise<any> {
    return this.appService.applePaySessionStart(body);
  }

  @Post('session/authorize')
  public async sessionAuthorize(@Body() body: any): Promise<any> {
    return {
      processed: true,
      transactionId: '1234',
    };
  }
}
