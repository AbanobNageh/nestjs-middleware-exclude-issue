import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let app: NestExpressApplication;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      imports: [AppModule],
    });

    const moduleFixture: TestingModule = await module.compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>(
      new ExpressAdapter(),
    );

    // remove the exclude and observe that it works
    await app.init();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('App middleware should be called for the /all endpoint because it is not excluded.', async () => {
      const result = await request(app.getHttpServer()).get(`/all`).expect(200);
      expect(result.text).toBe('/all endpoint called with middleware');
    });

    it("App middleware shouldn't be called for the /:id endpoint because it is excluded.", async () => {
      const result = await request(app.getHttpServer()).get(`/id`).expect(200);
      expect(result.text).toBe('/:id endpoint called without middleware');
    });
  });
});
