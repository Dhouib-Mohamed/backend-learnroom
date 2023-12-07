import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Student} from "../../student/entities/student.entity";
import {Teacher} from "../../teacher/entities/teacher.entity";
import {Course} from "../../course/entities/course.entity";

@Entity('classroom')
export class Classroom {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    image_id: number;
    @ManyToMany(() => Student, (e) => e.classes)
    @JoinTable({name: "student_class",})
    students: Student[];

    @ManyToOne(() => Teacher, (e) => e.classes)
    @JoinColumn({name: "teacher_class"})
    teacher: Teacher

    @OneToMany(() => Course, (e) => e.class)
    courses: Course[]
}
