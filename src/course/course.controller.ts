import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {CourseService} from './course.service';
import {CreateCourseDto} from "./dto/create-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import { RoleGuard } from "../authentification/role.guard";
import { Role } from "../authentification/role.enum";

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get(':id')
    @UseGuards(RoleGuard())
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Get('task/:id')
    @UseGuards(RoleGuard())
    getTasks(@Param('id') id: string) {
        return this.courseService.getAllTasks(id);
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
