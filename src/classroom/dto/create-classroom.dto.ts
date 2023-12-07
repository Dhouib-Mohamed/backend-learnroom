import {IsDefined, IsString} from "class-validator";

export class CreateClassroomDto {
    @IsDefined()
    @IsString()
    name: string;
    @IsDefined()
    @IsString()
    description: string;
}
