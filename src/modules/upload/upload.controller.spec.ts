import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import request from 'supertest';
const {
  APP_SERVER_LISTEN_IP,
  APP_SERVER_LISTEN_PORT,
  LOCAL_USER_TEST_ACCESS_TOKEN
} = process.env

const appUrl = `http://${APP_SERVER_LISTEN_IP}:${APP_SERVER_LISTEN_PORT}`

describe('UploadController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
    }).compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('', async () => {
    return
    const response = await request(appUrl)
      .get('/')
      .set('x-access-token', LOCAL_USER_TEST_ACCESS_TOKEN)
      .expect(200);

    expect(response.statusCode).toBe(200);
  });
});
