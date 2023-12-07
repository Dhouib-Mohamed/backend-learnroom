import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {PracticeService} from './practice.service';
import {CreatePracticeDto} from './dto/create-practice.dto';
import {UpdatePracticeDto} from './dto/update-practice.dto';

@Controller('assignment')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceService.getPractice(id);
  }

  @Post(":id")
  create(@Body() createClassroomDto: CreatePracticeDto, @Param("id") id) {
    return this.practiceService.createPractice(id, createClassroomDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdatePracticeDto) {
    return this.practiceService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practiceService.delete(id);
  }
}
