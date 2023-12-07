import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../../task/entities/task.entity";
import {Student} from "../../student/entities/student.entity";

@Entity('response_task')
export class ResponseTask {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    completed: boolean = false
    @ManyToOne(() => Task , (e) => e.responseTasks)
    @JoinColumn({name: "response_task"})
    task: Task
    @ManyToOne(() => Student , (e) => e.responseTasks)
    @JoinColumn({name: "response_task_student"})
    student: Student
}



