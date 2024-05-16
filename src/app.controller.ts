import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
  getAll(@Req() request: Request): string {
    return request.headers.middlewareCalled
      ? '/all endpoint called with middleware'
      : '/all endpoint called without middleware';
  }

  @Get('/:id')
  getId(@Req() request: Request): string {
    return request.headers.middlewareCalled
      ? '/:id endpoint called with middleware'
      : '/:id endpoint called without middleware';
  }
}
