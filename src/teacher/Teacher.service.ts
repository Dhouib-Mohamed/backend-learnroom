import {Injectable} from '@nestjs/common';
import {GenericService} from 'src/generic/generic.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Teacher} from "./entities/teacher.entity";

@Injectable()
export class TeacherService extends GenericService<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private practiceRepository: Repository<Teacher>,
    ) {
        super(practiceRepository)
    }

}
