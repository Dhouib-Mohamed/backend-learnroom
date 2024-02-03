import {IsDefined, IsString, MinLength} from "class-validator";


export class CreateResponseAssignmentDto  {
 @IsString()
 @IsDefined()
 @MinLength(10)
    content: string;

}
