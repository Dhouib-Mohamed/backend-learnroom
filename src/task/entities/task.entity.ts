import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "../../course/entities/course.entity";
import {ResponseTask} from "../../response_task/entities/response_task.entity";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    content: string;
    @ManyToOne(() => Course, (e) => e.tasks)
    @JoinColumn({name: "course_task"})
    course: Course
    @OneToMany(() => ResponseTask, (e) => e.task)
    responseTasks: ResponseTask[]

}
