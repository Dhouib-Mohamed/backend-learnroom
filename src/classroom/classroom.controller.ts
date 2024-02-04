import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Query } from "@nestjs/common";
import { ClassroomService } from "./classroom.service";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { UpdateClassroomDto } from "./dto/update-classroom.dto";
import { RoleGuard } from "../authentification/role.guard";
import { Role } from "../authentification/role.enum";
import { GetUser } from "../authentification/get-user.decorator";
import { TokenUser } from "../authentification/user.service";

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {
  }

  @Get('')
  @UseGuards(RoleGuard())
  getByQuery( @Query('query') query: string, @GetUser() user: TokenUser) {
    return this.classroomService.searchByName(query, user);
  }

  @Get(':id')
  @UseGuards(RoleGuard())
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(id);
  }

  @Get('course/:id')
  @UseGuards(RoleGuard())
  getCourses(@Param('id') id: string) {
    return this.classroomService.getAllCourses(id);
  }

  @Get('task/:id')
  @UseGuards(RoleGuard())
  getTasks(@Param('id') id: string, @Query('status') status: 'completed' | 'inProgress' | undefined, @GetUser() user: TokenUser) {
    return this.classroomService.getAllTasks(id, status, user);
  }

  @Get('assignment/:id')
  @UseGuards(RoleGuard())
  getAssignments(@Param('id') id: string) {
    return this.classroomService.getAllAssignments(id);
  }

  @Get('users/:id')
  @UseGuards(RoleGuard())
  getUsers(@Param('id') id: string) {
    return this.classroomService.getUsers(id);
  }

  @Post(":id")
  @UseGuards(RoleGuard(Role.Teacher))
  create(@Body() createClassroomDto: CreateClassroomDto, @Param("id") id) {
    return this.classroomService.createClass(id, createClassroomDto);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Teacher))
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.updateClass(id, updateClassroomDto);
  }

  @Patch(":id/:email")
  @UseGuards(RoleGuard([Role.Teacher,Role.Student]))
  addUser(@Param('email') email: string, @Param('id') id: string,) {
    return this.classroomService.addUser(id, email);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Teacher))
  remove(@Param('id') id: string) {
    return this.classroomService.deleteClass(id);
  }

  // @Get()
  // findAll() {
  //   return this.classroomService.findAll();
  // }
}
