import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Teacher} from "./entities/teacher.entity";
import {TeacherService} from "./Teacher.service";

@Module({
    providers: [TeacherService],
    exports: [TeacherService],
    imports: [
        TypeOrmModule.forFeature([Teacher])
    ],
})
export class TeacherModule {}
