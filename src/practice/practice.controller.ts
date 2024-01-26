import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {PracticeService} from './practice.service';
import {CreatePracticeDto} from './dto/create-practice.dto';
import {UpdatePracticeDto} from './dto/update-practice.dto';
import { RoleGuard } from "../authentification/role.guard";
import { Role } from "../authentification/role.enum";

@Controller('assignment')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {
  }

  @Get(':id')
  @UseGuards(RoleGuard())
  findOne(@Param('id') id: string) {
    return this.practiceService.getPractice(id);
  }

  @Post(":id")
  @UseGuards(RoleGuard(Role.Teacher))
  create(@Body() createClassroomDto: CreatePracticeDto, @Param("id") id) {
    return this.practiceService.createPractice(id, createClassroomDto);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Teacher))
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdatePracticeDto) {
    return this.practiceService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Teacher))
  remove(@Param('id') id: string) {
    return this.practiceService.delete(id);
  }
}
