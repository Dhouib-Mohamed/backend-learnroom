import {Test, TestingModule} from '@nestjs/testing';
import {ResponseTaskService} from './response_task.service';

describe('ResponseTaskService', () => {
  let service: ResponseTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseTaskService],
    }).compile();

    service = module.get<ResponseTaskService>(ResponseTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
