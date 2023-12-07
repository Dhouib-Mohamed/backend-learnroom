import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateCourseDto} from './dto/create-course.dto';
import {Course} from './entities/course.entity';
import {GenericService} from 'src/generic/generic.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ClassroomService} from "../classroom/classroom.service";
import {Practice} from "../practice/entities/practice.entity";
import {Task} from "../task/entities/task.entity";

@Injectable()
export class CourseService extends GenericService<Course> {


    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Practice)
        private practiceRepository: Repository<Practice>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @Inject(forwardRef(() => ClassroomService))
        private readonly classService: ClassroomService
    ) {
        super(courseRepository);
    }

    createCourse = async (id, createCourseDto: CreateCourseDto) => {
        try {
            const classroom = await this.classService.findOne(id);
            return await this.create({...createCourseDto, class: classroom, tasks: [], assignments: []})
        } catch (e) {
            return e.sqlmessage ?? e;
        }
    }

    async getAllTasks(id: any): Promise<Task[]> {
        try {
            const course = await this.findOne(id)
            return await this.taskRepository.findBy({course})
        } catch (e) {
            console.log(e);
            return e.sqlmessage ?? e;
        }
    }

    async getAllAssignments(id: any): Promise<Practice[]> {
        try {
            const course = await this.findOne(id)
            return await this.practiceRepository.find({
                where: {course},
                order: {deadline: 'ASC'},
            })
        } catch (e) {
            console.log(e);
            return e.sqlmessage ?? e;
        }
    }

    async deleteCourse(id) {
        try {
            const assignments = await this.getAllAssignments(id)
            const tasks = await this.getAllTasks(id)
            for (const e of tasks) {
                await this.taskRepository.delete(e.id)
            }
            for (const e of assignments) {
                await this.practiceRepository.delete(e.id)
            }
            return this.delete(id)
        } catch (e) {
            console.log(e);
            return e.sqlmessage ?? e;
        }
    }
}
