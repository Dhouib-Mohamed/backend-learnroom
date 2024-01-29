import {Module} from '@nestjs/common';
import {PracticeService} from './practice.service';
import {PracticeController} from './practice.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Practice} from "./entities/practice.entity";
import {CourseModule} from "../course/course.module";
import {Teacher} from "../teacher/entities/teacher.entity";
import {Classroom} from "../classroom/entities/classroom.entity";
import { TokenService } from "../authentification/token.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Practice]),
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([Teacher]),
    CourseModule
  ],
  exports: [PracticeService],
  controllers: [PracticeController],
  providers: [PracticeService,TokenService]
})
export class PracticeModule {}
