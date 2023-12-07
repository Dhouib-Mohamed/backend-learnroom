import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";
import {Exclude} from "class-transformer";
import {Classroom} from "../../classroom/entities/classroom.entity";
import {ResponseAssignment} from "../../response_assignment/entities/response_assignment.entity";
import {ResponseTask} from "../../response_task/entities/response_task.entity";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({unique: true})
    @IsEmail()
    email: string;
    @Column()
    @Exclude()
    password: string;
    @Column()
    name: string;
    @Column()
    avatar_color: string;
    @ManyToMany(() => Classroom, (e) => e.students, {eager: true})
    classes: Classroom[]

    @OneToMany(() => ResponseTask  , (e) => e.student)
    responseTasks: ResponseTask[]

    @OneToMany(() => ResponseAssignment  , (e) => e.student)
    responseAssignments: ResponseAssignment[]
}
