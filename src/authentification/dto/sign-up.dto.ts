import {IsBoolean, IsDefined, IsString, Length} from "class-validator";
import {SignInDto} from "./sign-in.dto";

export class SignUpDto extends SignInDto {
    @IsDefined()
    @IsString()
    @Length(4, 16)
    name: string;
    @IsDefined()
    @IsBoolean()
    user: Boolean;
}
