import {IsDefined, IsString, MinLength} from "class-validator";


export class UpdateResponseAssignmentDto  {
 @IsString()
 @IsDefined()
 @MinLength(10)
    content: string;
}
