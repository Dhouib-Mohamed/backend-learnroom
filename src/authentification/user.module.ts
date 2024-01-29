import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TeacherModule} from "../teacher/teacher.module";
import {StudentModule} from "../student/student.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Teacher} from "../teacher/entities/teacher.entity";
import {Student} from "../student/entities/student.entity";
import {ClassroomModule} from "../classroom/classroom.module";
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { RoleGuard } from "./role.guard";

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([Student]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '10h' },
      secret: process.env.JWT_SECRET_KEY,
    }),
    TeacherModule, StudentModule, ClassroomModule],
  controllers: [UserController],
  providers: [UserService,TokenService],
  exports: [TokenService]
})
export class UserModule {
}
