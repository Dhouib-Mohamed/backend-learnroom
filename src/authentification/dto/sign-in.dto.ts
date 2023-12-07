import {IsDefined, IsEmail, IsString, MinLength} from "class-validator";

export class SignInDto {
    @IsDefined()
    @IsString()
    @IsEmail()
    email: string;
    @IsDefined()
    @IsString()
    @MinLength(6)
    password: string;
}
