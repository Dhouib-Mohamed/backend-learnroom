import {forwardRef, Module} from '@nestjs/common';
import {CourseService} from './course.service';
import {CourseController} from './course.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Course} from "./entities/course.entity";
import {ClassroomModule} from "../classroom/classroom.module";
import {Practice} from "../practice/entities/practice.entity";
import {Task} from "../task/entities/task.entity";
import { TokenService } from "../authentification/token.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Course]),
        TypeOrmModule.forFeature([Practice]),
        TypeOrmModule.forFeature([Task]),
        forwardRef(() => ClassroomModule),
    ],
    providers: [CourseService,TokenService],
    exports: [CourseService],
    controllers: [CourseController],
})
export class CourseModule {
}
