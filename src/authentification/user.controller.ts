import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { TokenUser, UserService } from "./user.service";
import { RoleGuard } from "./role.guard";
import { GetUser } from "./get-user.decorator";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Post("signin",)
  async signin(@Body() SignInDto: SignInDto) {
    return this.userService.signIn(SignInDto);
  }

  @Post("signup")
  async signup(@Body() SignUpDto: SignUpDto) {
    return this.userService.signup(SignUpDto);
  }

  @Get("/current")
  @UseGuards(RoleGuard())
  current(@GetUser() user: TokenUser ) {
    return this.userService.getUser(user);
  }

  @Get("/all")
  @UseGuards(RoleGuard())
  all(@GetUser() user: TokenUser) {
    return this.userService.getAll(user)
  }
}
