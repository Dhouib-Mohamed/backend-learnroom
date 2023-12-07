import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Student} from "./entities/student.entity";
import {StudentService} from "./student.service";

@Module({
    providers: [StudentService],
    exports: [StudentService],
    imports: [
        TypeOrmModule.forFeature([Student])
    ],
})
export class StudentModule {
}
