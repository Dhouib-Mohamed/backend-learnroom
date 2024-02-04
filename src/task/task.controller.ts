import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { RoleGuard } from "../authentification/role.guard";
import { Role } from "../authentification/role.enum";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Post(":id")
    @UseGuards(RoleGuard(Role.Teacher))
    create(@Body() createTaskDto: CreateTaskDto, @Param("id") id) {
        return this.taskService.createTask(id, createTaskDto);
    }

    @Get()
    @UseGuards(RoleGuard())
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard([Role.Teacher,Role.Student]))
    findOne(@Param('id') id: string) {
        return this.taskService.getTask(id);
    }

    @Patch(':id')
    @UseGuards(RoleGuard(Role.Teacher))
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard(Role.Teacher))
    remove(@Param('id') id: string) {
        return this.taskService.delete(id);
    }
}
