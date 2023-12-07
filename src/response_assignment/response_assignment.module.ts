import {Module} from '@nestjs/common';
import {ResponseAssignmentService} from './response_assignment.service';
import {ResponseAssignmentController} from './response_assignment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {ResponseAssignment} from "./entities/response_assignment.entity";
import {PracticeModule} from "../practice/practice.module";
import {StudentModule} from "../student/student.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ResponseAssignment]),
      PracticeModule, StudentModule
  ],
  controllers: [ResponseAssignmentController],
  providers: [ResponseAssignmentService]
})
export class ResponseAssignmentModule {}
