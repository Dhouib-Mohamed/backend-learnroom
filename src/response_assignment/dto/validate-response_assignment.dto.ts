import {IsDefined, IsInt} from "class-validator";


export class ValidateResponseAssignmentDto {
    @IsDefined()
    @IsInt()
    score: number;
}
