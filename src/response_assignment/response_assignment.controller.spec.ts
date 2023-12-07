import {Test, TestingModule} from '@nestjs/testing';
import {ResponseAssignmentController} from './response_assignment.controller';
import {ResponseAssignmentService} from './response_assignment.service';

describe('ResponseAssignmentController', () => {
  let controller: ResponseAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseAssignmentController],
      providers: [ResponseAssignmentService],
    }).compile();

    controller = module.get<ResponseAssignmentController>(ResponseAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
