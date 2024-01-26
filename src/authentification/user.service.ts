import { Injectable, NotFoundException } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { TeacherService } from "../teacher/Teacher.service";
import { StudentService } from "../student/student.service";
import { Teacher } from "../teacher/entities/teacher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student/entities/student.entity";
import { ClassroomService } from "../classroom/classroom.service";
import * as bcrypt from "bcrypt";
import { TokenService } from "./token.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { Role } from "./role.enum";

@Injectable()
export class UserService {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
        private readonly classService: ClassroomService,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        private readonly authService: TokenService,
    ) {
    }

    async signIn(SignInDto: SignInDto): Promise<{token: String }> {
        try {
            let content
            const teacher: any = await this.teacherRepository.findOneBy({email: SignInDto.email})
            console.log(teacher);
            if (teacher) {
                const hashedMdp = await bcrypt.hash(SignInDto.password, process.env.salt);
                if (hashedMdp !== teacher.password) {
                    throw new NotFoundException(`Incorrect Password`);
                }
                content =  {...teacher, user: true}
            }
            const student: any = await this.studentRepository.findOneBy({email: SignInDto.email})
            console.log(student);
            if (student) {
                const hashedMdp = await bcrypt.hash(SignInDto.password, process.env.salt);
                if (hashedMdp !== student.password) {
                    throw new NotFoundException(`Incorrect Password`);
                }
                content =  {...student, user: false}
            }
            if (content) {
                return {token: await this.authService.encode({role: content.user ? Role.Teacher : Role.Student,id:content.id})}
            }
            throw new NotFoundException("Email Not Found")
        } catch (e) {
            return (e)
        }
    }

    async signup(SignUpDto:SignUpDto) {

        try {
            let user : (Teacher| Student) & {user:Boolean}
            const noTeacher = await this.teacherRepository.findOneBy({email: SignUpDto.email})
            const noStudent = await this.teacherRepository.findOneBy({email: SignUpDto.email})
            if (noTeacher || noStudent) {
                throw new NotFoundException("Email Is already used")
            }
            if (SignUpDto.user) {
                SignUpDto.password=await bcrypt.hash(SignUpDto.password, process.env.salt);
                user = await this.teacherService.create({
                    ...SignUpDto,
                    avatar_color: "#" + Math.floor(Math.random() * 16777215).toString(16),
                    classes: []
                });
            } else {
                SignUpDto.password=await bcrypt.hash(SignUpDto.password, process.env.salt);
                user = await this.studentService.create({
                    ...SignUpDto,
                    avatar_color: "#" + Math.floor(Math.random() * 16777215).toString(16),
                    classes: []
                });
            }

            if (!user) {
                throw new NotFoundException();
            }
            return {token: await this.authService.encode({role: SignUpDto.user ? Role.Teacher : Role.Student,id:user.id})}
        } catch (e) {
            return (e)
        }
    }

    async getAll(user: TokenUser) {
        try {
            let classes
            if (user.role==="teacher") {
                const teacher = await this.teacherService.findOne(user.id)
                classes = await this.classService.findByCriteria({teacher: teacher})
            } else {
                const student = await this.studentService.findOne(user.id)
                classes = await this.classService.findByCriteria({students: student})
            }
            const courses = []
            const tasks = []
            const assignments = []
            for (const e of classes) {
                courses.push(await this.classService.getAllCourses(e.id))
                tasks.push(await this.classService.getAllTasks(e.id))
                assignments.push(await this.classService.getAllAssignments(e.id))
            }
            return {courses, tasks, assignments}
        } catch (e) {
            return (e)
        }
    }

    async getUser(user:TokenUser) {
        try {
            if (user.role === Role.Teacher) {
                return { ...await this.teacherService.findOne(user.id),user:true }
            }
            if (user.role === Role.Student) {
                return { ...await this.studentService.findOne(user.id),user:false }
            }
        } catch (e) {
            return (e)
        }
    }
}

export type TokenUser = { role: Role, id: string }

