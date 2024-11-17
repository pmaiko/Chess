// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
//
// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}
//
//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Hello world!' };
  }
}
