import {IsDefined, IsString} from "class-validator";

export class CreateCourseDto {
    @IsDefined()
    @IsString()
    name: string;
    @IsDefined()
    @IsString()
    content: string;
}
