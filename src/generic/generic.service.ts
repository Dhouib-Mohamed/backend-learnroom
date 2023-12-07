import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, EntitySchema, FindOptionsWhere, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class GenericService<Entity> {
    constructor(
        @InjectRepository(EntitySchema)
        private readonly repository: Repository<Entity>) {
    }


    async create(dto): Promise<any> {
        try {
            return await this.repository.save(dto);
        } catch (e) {
            return e
        }
    }

    async findAll(): Promise<any> {
        try {
            return await this.repository.find();
        } catch (e) {
            return e
        }
    }


    async findOne(id: any): Promise<any> {
        try {
            const result = await this.repository.findOneBy({id: id} as FindOptionsWhere<Entity>);
            if (!result) {
                throw new NotFoundException()
            }
            return result
        } catch (e) {
            return e
        }
    }

    async findOneByCriteria(dto): Promise<any> {
        try {
            const result = await this.repository.findOneBy(dto as FindOptionsWhere<Entity>);
            if (!result) {
                throw new NotFoundException()
            }
            return result
        } catch (e) {
            return e
        }
    }

    async findByCriteria(dto): Promise<any> {
        try {
            const result = await this.repository.findBy(dto as FindOptionsWhere<Entity>);
            if (!result) {
                throw new NotFoundException()
            }
            return result
        } catch (e) {
            return e
        }
    }

    async find(dto): Promise<any> {
        try {
            const result = await this.repository.find(dto);
            if (!result) {
                throw new NotFoundException()
            }
            return result
        } catch (e) {
            return e
        }
    }

    async update(id: string, dto): Promise<UpdateResult> {
        try {
            return await this.repository.update(id, dto);
        } catch (e) {
            console.log(e)
            return e.sqlmessage ?? e
        }
    }

    async delete(id: any): Promise<DeleteResult> {
        try {
            return await this.repository.delete(id);
        } catch (e) {
            return e.sqlmessage ?? e
        }
    }
}

