import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {ILike, In, Not} from "typeorm";
import { TokenUser } from "../authentification/user.service";
import { ResponseTask } from "../response_task/entities/response_task.entity";
import { Student } from "../student/entities/student.entity";
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
        private readonly classService: ClassroomService,
        @InjectRepository(ResponseTask)
          private responseTaskRepository: Repository<ResponseTask>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
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

    async getAllTasks(id: any, status?: string, user?: TokenUser): Promise<Task[]> {
        try {
            const course = await this.findOne(id)
            if (!status || !user || user.role === 'teacher') {
                return await this.taskRepository.findBy({course: {id: course.id}})
            }
            else {
                let responseTasks;
                let tasks;

                 responseTasks = await this.responseTaskRepository.findBy({
                    student: { id: user.id },
                    completed:true
                })

                if (!responseTasks.length)  {
                    return [];
                }

                tasks= await this.taskRepository.find({
                    where: {
                        responseTasks:responseTasks,
                        course,
                    }})
                if(status=="completed"){
                    return tasks
                }
                return  await this.taskRepository.find({
                    where: {
                        id: Not(In(tasks.map(e => e.id))),
                        course,
                    }
                })


            }
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
    async searchCourse(query: string, classroomId: string) {
        try {
            const classroom = await this.classService.findOne(classroomId)
            return await this.courseRepository.find({
                where: {
                    class: classroom,
                    name: ILike(`%${query}%`)
                }
            })
        } catch (e) {
            console.log(e);
            return e.sqlmessage ?? e;
        }
    }
}
