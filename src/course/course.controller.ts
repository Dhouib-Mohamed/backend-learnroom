import { Req } from "@nestjs/common";
import { Body, Query, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "../authentification/get-user.decorator";
import { TokenUser } from "../authentification/user.service";
import {CourseService} from './course.service';
import {CreateCourseDto} from "./dto/create-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import { RoleGuard } from "../authentification/role.guard";
import { Role } from "../authentification/role.enum";

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get('search')
     search(@Query('classroomId') classroomId, @Query('query') query: string) {
        return this.courseService.searchCourse(query, classroomId);
    }

    @Get(':id')
    @UseGuards(RoleGuard())
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Get('task/:id')
    @UseGuards(RoleGuard())
    getTasks(@Param('id') id: string,
             @Query('status') status: 'completed' | 'inProgress' | undefined,
             @GetUser() user:TokenUser) {
        return this.courseService.getAllTasks(id, status, user);
    }

    @Get('assignment/:id')
    @UseGuards(RoleGuard())
    getAssignments(@Param('id') id: string) {
        return this.courseService.getAllAssignments(id);
    }

    @Post(":id")
    @UseGuards(RoleGuard(Role.Teacher))
    create(@Body() createClassroomDto: CreateCourseDto, @Param("id") id) {
        return this.courseService.createCourse(id, createClassroomDto);
    }

    @Patch(':id')
    @UseGuards(RoleGuard(Role.Teacher))
    update(@Param('id') id: string, @Body() updateClassroomDto: UpdateCourseDto) {
        return this.courseService.update(id, updateClassroomDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard(Role.Teacher))
    remove(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
