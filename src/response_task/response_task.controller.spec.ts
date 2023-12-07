import {Test, TestingModule} from '@nestjs/testing';
import {ResponseTaskController} from './response_task.controller';
import {ResponseTaskService} from './response_task.service';

describe('ResponseTaskController', () => {
  let controller: ResponseTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseTaskController],
      providers: [ResponseTaskService],
    }).compile();

    controller = module.get<ResponseTaskController>(ResponseTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
