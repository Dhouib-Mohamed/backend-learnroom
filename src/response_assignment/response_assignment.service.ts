import {Injectable} from '@nestjs/common';
import {GenericService} from "../generic/generic.service";
import {ResponseAssignment} from "./entities/response_assignment.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PracticeService} from "../practice/practice.service";
import {StudentService} from "../student/student.service";

@Injectable()
export class ResponseAssignmentService extends GenericService<ResponseAssignment> {
    constructor(
        @InjectRepository(ResponseAssignment)
        private responsePracticeRepository: Repository<ResponseAssignment>,
        private readonly PracticeService: PracticeService,
        private readonly StudentService: StudentService,
    ) {
        super(responsePracticeRepository);
    }

    getResponse = async (idAssignment, idStudent) => {
        try {
            const assignment = await this.PracticeService.findOne(idAssignment);
            console.log(assignment)
            const student = await this.StudentService.findOne(idStudent);
            console.log(student)
            const response = await this.responsePracticeRepository.findOneBy({student, assignment})
           if(response){
               return response
           }
           return await this.responsePracticeRepository.save({content:"", assignment , student})


        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }
}
