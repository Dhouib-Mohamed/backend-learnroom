import {Injectable} from '@nestjs/common';
import {GenericService} from 'src/generic/generic.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Student} from "./entities/student.entity";

@Injectable()
export class StudentService extends GenericService<Student> {
    constructor(
        @InjectRepository(Student)
        private practiceRepository: Repository<Student>,
    ) {
        super(practiceRepository)
    }



}
