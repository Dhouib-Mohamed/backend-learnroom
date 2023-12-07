import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CourseService} from './course.service';
import {CreateCourseDto} from "./dto/create-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Get('task/:id')
    getTasks(@Param('id') id: string) {
        return this.courseService.getAllTasks(id);
    }

    @Get('assignment/:id')
    getAssignments(@Param('id') id: string) {
        return this.courseService.getAllAssignments(id);
    }

    @Post(":id")
    create(@Body() createClassroomDto: CreateCourseDto, @Param("id") id) {
        return this.courseService.createCourse(id, createClassroomDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClassroomDto: UpdateCourseDto) {
        return this.courseService.update(id, updateClassroomDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
