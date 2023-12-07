import {IsDefined, IsNumber, IsString} from "class-validator";

export class CreatePracticeDto {
    @IsDefined()
    @IsString()
    name: string;
    @IsDefined()
    @IsString()
    content: string;
    @IsDefined()
    deadline: string;
    @IsNumber()
    @IsDefined()
    points: number;

}
