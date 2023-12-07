import {
    PrimaryGeneratedColumn, Entity,
} from 'typeorm';

@Entity()
export abstract class Generic {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}