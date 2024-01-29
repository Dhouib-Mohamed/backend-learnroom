import {forwardRef, Module} from '@nestjs/common';
import {ClassroomService} from './classroom.service';
import {ClassroomController} from './classroom.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Classroom} from './entities/classroom.entity';
import {CourseModule} from '../course/course.module';
import {TeacherModule} from "../teacher/teacher.module";
import {StudentModule} from "../student/student.module";
import { TokenService } from "../authentification/token.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Classroom]),
        TeacherModule, StudentModule, forwardRef(() => CourseModule),
    ],
    providers: [ClassroomService,TokenService],
    exports: [ClassroomService],
    controllers: [ClassroomController],
})
export class ClassroomModule {
}
