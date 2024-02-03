import {Injectable} from '@nestjs/common';
import {GenericService} from "../generic/generic.service";
import {ResponseAssignment} from "./entities/response_assignment.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PracticeService} from "../practice/practice.service";
import {StudentService} from "../student/student.service";
import {CreateResponseAssignmentDto} from "./dto/update-response_assignment.dto";

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

    getResponse = async (idAssignment:string, idStudent:string) => {
        try {
            const assignment = await this.PracticeService.findOne(idAssignment);
            const student = await this.StudentService.findOne(idStudent);
            return await this.responsePracticeRepository.findOneBy({student, assignment})

        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }
    getResponses = async (idAssignment:string) => {
        try {
            const assignment = await this.PracticeService.findOne(idAssignment);
            const reponses =  await this.responsePracticeRepository.findBy({assignment})
            return reponses

        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }

    handleResponse = async (idAssignment:string, idStudent:string,createResponse:CreateResponseAssignmentDto) => {
        try {
            const assignment = await this.PracticeService.findOne(idAssignment);
            const student = await this.StudentService.findOne(idStudent);
            const newResponse =await this.create({score:0,...createResponse, assignment , student})
            return newResponse
        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }

}
