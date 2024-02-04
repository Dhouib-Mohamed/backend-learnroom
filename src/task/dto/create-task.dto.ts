import {IsDefined, IsNumber, IsString} from "class-validator";

export class CreateTaskDto {
    @IsDefined()
    @IsString()
    name: string;
    @IsDefined()
    @IsString()
    content: string;
}
