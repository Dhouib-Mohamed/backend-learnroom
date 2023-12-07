import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ClassroomService} from './classroom.service';
import {CreateClassroomDto} from './dto/create-classroom.dto';
import {UpdateClassroomDto} from './dto/update-classroom.dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(id);
  }

  @Get('course/:id')
  getCourses(@Param('id') id: string) {
    return this.classroomService.getAllCourses(id);
  }

  @Get('task/:id')
  getTasks(@Param('id') id: string) {
    return this.classroomService.getAllTasks(id);
  }

  @Get('assignment/:id')
  getAssignments(@Param('id') id: string) {
    return this.classroomService.getAllAssignments(id);
  }

  @Get('users/:id')
  getUsers(@Param('id') id: string) {
    return this.classroomService.getUsers(id);
  }

  @Post(":id")
  create(@Body() createClassroomDto: CreateClassroomDto, @Param("id") id) {
    return this.classroomService.createClass(id, createClassroomDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.updateClass(id, updateClassroomDto);
  }

  @Patch(":id/:email")
  addUser(@Param('email') email: string, @Param('id') id: string,) {
    return this.classroomService.addUser(id, email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.deleteClass(id);
  }


  // @Get()
  // findAll() {
  //   return this.classroomService.findAll();
  // }
  //
  //

  //
}
