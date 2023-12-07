import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "../../course/entities/course.entity";
import {ResponseAssignment} from "../../response_assignment/entities/response_assignment.entity";

@Entity('practice')
export class Practice {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    content: string;
    @Column()
    deadline: string;
    @Column()
    points: number
    @ManyToOne(() => Course, (e) => e.practices)
    @JoinColumn({name: "course_practice"})
    course: Course
    @OneToMany(() => ResponseAssignment, (e) => e.assignment, {eager: true})
    responseAssignments: ResponseAssignment[]
}
