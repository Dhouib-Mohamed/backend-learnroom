import {Injectable} from '@nestjs/common';

import {GenericService} from "../generic/generic.service";
import {ResponseTask} from "./entities/response_task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StudentService} from "../student/student.service";
import {TaskService} from "../task/task.service";

@Injectable()
export class ResponseTaskService extends GenericService<ResponseTask> {
    constructor(
        @InjectRepository(ResponseTask)
        private responseTaskRepository: Repository<ResponseTask>,
        private readonly TaskService: TaskService,
        private readonly StudentService: StudentService,
    ) {
        super(responseTaskRepository);
    }

    getResponseTask = async (idTask, idStudent) => {
        try {
            const task = await this.TaskService.findOne(idTask);
            const student = await this.StudentService.findOne(idStudent)
            const response =  await this.responseTaskRepository.findOneBy({student, task})
            if(response){
                return response
            }
            return await this.responseTaskRepository.save({completed:false, task , student})

        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }


}
