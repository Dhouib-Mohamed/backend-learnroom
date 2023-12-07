import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsInt} from "class-validator";
import {Exclude} from "class-transformer";
import {Student} from "../../student/entities/student.entity";
import {Classroom} from "../../classroom/entities/classroom.entity";

@Entity('teacher')
export class Teacher {
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
    @OneToMany(() => Classroom, (e) => e.teacher, {eager: true})
    classes: Classroom[]
}
