import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TeacherModule} from "../teacher/teacher.module";
import {StudentModule} from "../student/student.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Teacher} from "../teacher/entities/teacher.entity";
import {Student} from "../student/entities/student.entity";
import {ClassroomModule} from "../classroom/classroom.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([Student]),
    TeacherModule, StudentModule, ClassroomModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
