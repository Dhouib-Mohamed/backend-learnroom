import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { Classroom } from "./entities/classroom.entity";
import { GenericService } from "src/generic/generic.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherService } from "../teacher/Teacher.service";
import { StudentService } from "../student/student.service";
import { Practice } from "../practice/entities/practice.entity";
import { Task } from "../task/entities/task.entity";
import { CourseService } from "../course/course.service";
import { Course } from "../course/entities/course.entity";
import { Role } from "../authentification/role.enum";
import { TokenUser } from "../authentification/user.service";

@Injectable()
export class ClassroomService extends GenericService<Classroom> {


  constructor(
    @InjectRepository(Classroom)
    private classRepository: Repository<Classroom>,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService
  ) {
    super(classRepository);
  }

  createClass = async (id, createClassroomDto: CreateClassroomDto) => {
    try {
      const teacher = await this.teacherService.findOne(id);
      return await this.create({
        ...createClassroomDto,
        image_id: Math.floor(Math.random() * 8),
        teacher,
        students: []
      });
    } catch (e) {
      return e.sqlmessage ?? e;
    }
  }

  async addUser(id: string, email: string) {
    try {
      const student = await this.studentService.findOneByCriteria({ email });
      console.log(student);
      const currentClass = await this.findOne(id);
      student.classes = student.classes ?? [];
      student.classes.push(currentClass);
      await this.studentService.create(student);
      currentClass.students = await this.studentService.findByCriteria({ classes: currentClass }) ?? [];
      const { classes, ...studentData } = student;
      currentClass.students.push(studentData);
      await this.create(currentClass);
      return await this.studentService.findOneByCriteria({ email })
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  getUsers = async (id) => {
    try {
      const currentClass = await this.findOne(id);
      return ({
        teacher: await this.teacherService.findOneByCriteria({ classes: currentClass }),
        students: (await this.studentService.findByCriteria({ classes: currentClass }) ?? [])
      });
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  };

  async updateClass(id: any, dto): Promise<DeleteResult> {
    try {
      const oldClass = await this.findOne(id)
      await super.update(id, dto);
      return { ...(await this.teacherService.findOne(oldClass.teacher)), user: true }
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  async getAllCourses(id: any): Promise<Course[]> {
    try {
      const classroom = await this.findOne(id)
      return [...(await this.courseService.findByCriteria({ class: classroom }))]
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  async getAllTasks(id: any, status?: string, user?: TokenUser): Promise<Task[]> {
    try {
      const classes = await this.getAllCourses(id)
      let tasks = []
      for (const e of classes) {
        tasks = [...tasks, ...(await this.courseService.getAllTasks(e.id, status, user))]
      }
      return tasks
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  async getAllAssignments(id: any): Promise<Practice[]> {
    try {
      const classes = await this.getAllCourses(id)
      let assignments = []
      for (const e of classes) {
        assignments = [...assignments, ...(await this.courseService.getAllAssignments(e.id))]
      }
      return assignments
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  async deleteClass(id) {
    try {
      const oldClass = await this.findOne(id)
      const courses = await this.getAllCourses(id)
      for (const e of courses) {
        await this.courseService.delete(e.id)
      }
      await this.delete(id)
      return { ...(await this.teacherService.findOne(oldClass.teacher)), user: true }
    } catch (e) {
      console.log(e);
      return e.sqlmessage ?? e;
    }
  }

  async searchByName(className: string, user: TokenUser): Promise<Classroom[] | undefined> {
    try {
      if (user.role === Role.Student) {
        const student = await this.studentService.findOne(user.id)
        if (!className) {
          return await this.findByCriteria({ students: student })
        }
        return await this.classRepository.find({
          where: {
            name: ILike(`%${className}%`),
            students: student
          },
          relations: ['students']
        });
      }
      if (user.role === Role.Teacher) {
        const teacher = await this.teacherService.findOne(user.id)
        if (!className) {
          return await this.findByCriteria({ teacher: teacher })
        }
        return await this.classRepository.find({
          where: {
            name: ILike(`%${className}%`),
            teacher: teacher
          },
          relations: ['teacher']
        });
      }
      return []
      }
    catch(e)
      {
        console.log(e);
        return e.sqlmessage ?? e;
      }
    }
  }
