import {Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {CourseModule} from "../course/course.module";
import {Course} from "../course/entities/course.entity";
import {Classroom} from "../classroom/entities/classroom.entity";
import {Teacher} from "../teacher/entities/teacher.entity";
import { TokenService } from "../authentification/token.service";

@Module({
    controllers: [TaskController],
    providers: [TaskService,TokenService],
    exports: [TaskService],
    imports: [
        TypeOrmModule.forFeature([Task]),
        TypeOrmModule.forFeature([Course]),
        TypeOrmModule.forFeature([Classroom]),
        TypeOrmModule.forFeature([Teacher]),
        CourseModule
    ],
})
export class TaskModule {
}
