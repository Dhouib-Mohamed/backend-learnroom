import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Classroom} from "../../classroom/entities/classroom.entity";
import {Practice} from "../../practice/entities/practice.entity";
import {Task} from "../../task/entities/task.entity";

@Entity('course')
export class Course {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    content: string;
    @ManyToOne(() => Classroom, (e) => e.courses)
    @JoinColumn({name: "course_class"})
    class: Classroom
    @OneToMany(() => Practice, (e) => e.course)
    practices: Practice[]
    @OneToMany(() => Task, (e) => e.course)
    tasks: Task[]
}
