import {Injectable} from '@nestjs/common';
import {GenericService} from 'src/generic/generic.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Task} from "./entities/task.entity";
import {CourseService} from "../course/course.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Course} from "../course/entities/course.entity";
import {Teacher} from "../teacher/entities/teacher.entity";
import {Classroom} from "../classroom/entities/classroom.entity";

@Injectable()
export class TaskService extends GenericService<Task> {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Classroom)
        private classRepository: Repository<Classroom>,
        private readonly courseService: CourseService
    ) {
        super(taskRepository);
    }

    createTask = async (id, createTaskDto: CreateTaskDto) => {
        try {
            const course = await this.courseService.findOne(id);
            return await this.create({...createTaskDto, course: course});
        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }
    getTask = async (id) => {
        try {
            const task = await this.findOne(id);
            const course = await this.courseRepository.findOneBy({tasks: task})
            const currentClass = await this.classRepository.findOneBy({courses: course})
            return {...task, teacher: (await this.teacherRepository.findOneBy({classes: currentClass}))}
        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }
}
