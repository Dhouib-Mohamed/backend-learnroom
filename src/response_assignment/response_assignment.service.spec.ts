import {Test, TestingModule} from '@nestjs/testing';
import {ResponseAssignmentService} from './response_assignment.service';

describe('ResponseAssignmentService', () => {
  let service: ResponseAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseAssignmentService],
    }).compile();

    service = module.get<ResponseAssignmentService>(ResponseAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
