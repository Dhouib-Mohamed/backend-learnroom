import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Student} from "../../student/entities/student.entity";
import {Practice} from "../../practice/entities/practice.entity";

@Entity('response_assignment')
export class ResponseAssignment {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    content: string;
    @Column()
    score: number = 0
    @ManyToOne(() => Practice, (e) => e.responseAssignments)
    @JoinColumn({name: "response_practice"})
    assignment: Practice
    @ManyToOne(() => Student, (e) => e.responseAssignments)
    @JoinColumn({name: "response_practice_student"})
    student: Student
}