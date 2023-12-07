import {Injectable, NotFoundException} from '@nestjs/common';
import {SignInDto} from "./dto/sign-in.dto";
import {TeacherService} from "../teacher/Teacher.service";
import {StudentService} from "../student/student.service";
import {Teacher} from "../teacher/entities/teacher.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Student} from "../student/entities/student.entity";
import {ClassroomService} from "../classroom/classroom.service";
import * as bcrypt from 'bcrypt';

// const salt= bcrypt.genSalt();
// console.log(salt)

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
    ) {
    }

    async signIn(SignInDto: SignInDto) {
        try {
            const teacher: any = await this.teacherRepository.findOneBy({email: SignInDto.email})
            console.log(teacher)
            if (teacher) {
                // if (teacher.password !== SignInDto.password) {
                //     throw new NotFoundException("Password Not Found")
                // }
                const hashedMdp = await bcrypt.hash(SignInDto.password, process.env.salt);
                if (hashedMdp !== teacher.password) {
                    throw new NotFoundException(`Incorrect Password`);
                }
                // teacher.password = teacher.password.length

                return {...teacher, user: true}
            }
            console.log(teacher)
            const student: any = await this.studentRepository.findOneBy({email: SignInDto.email})
            console.log(student)
            if (student) {
                // if (student.password !== SignInDto.password) {
                //     throw new NotFoundException("Password Not Found")
                // }
                const hashedMdp = await bcrypt.hash(SignInDto.password, process.env.salt);
                if (hashedMdp !== student.password) {
                    throw new NotFoundException(`Incorrect Password`);
                }
                // student.password = student.password.length
                return {...student, user: false}
            }
            throw new NotFoundException("Email Not Found")
        } catch (e) {
            return (e)
        }
    }

    async signup(SignUpDto) {

        try {
            let user
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
                //user.password= await bcrypt.hash(user.password, process.env.salt);
            } else {
                console.log("student")
                SignUpDto.password=await bcrypt.hash(SignUpDto.password, process.env.salt);
                console.log(SignUpDto)
                user = await this.studentService.create({
                    ...SignUpDto,
                    avatar_color: "#" + Math.floor(Math.random() * 16777215).toString(16),
                    classes: []
                });
                //user.password= await bcrypt.hash(SignUpDto.mdp, process.env.salt);
            }

            if (!user) {
                throw new NotFoundException();
            }
            // user.password = user.password.length
            user.user = SignUpDto.user;
            return user;
        } catch (e) {
            console.log("erreur")
            return (e)
        }
    }

    async getAll(id, type) {
        try {
            let classes
            if (type) {
                const teacher = await this.teacherService.findOne(id)
                classes = await this.classService.findByCriteria({teacher: teacher})
            } else {
                const student = await this.studentService.findOne(id)
                classes = await this.classService.findByCriteria({students: student})
            }
            console.log(classes)
            let courses = []
            let tasks = []
            let assignments = []
            for (const e of classes) {
                courses = [...courses, ...(await this.classService.getAllCourses(e.id))]
                tasks = [...tasks, ...(await this.classService.getAllTasks(e.id))]
                assignments = [...assignments, ...(await this.classService.getAllAssignments(e.id))]
            }
            console.log()
            return {courses, tasks, assignments}
        } catch (e) {
            return (e)
        }
    }
}

