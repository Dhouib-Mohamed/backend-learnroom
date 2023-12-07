import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {ResponseAssignmentService} from './response_assignment.service';

import {UpdateResponseAssignmentDto} from './dto/update-response_assignment.dto';
import {ValidateResponseAssignmentDto} from "./dto/validate-response_assignment.dto";

@Controller('response-assignment')
export class ResponseAssignmentController {
  constructor(private readonly responseAssignmentService: ResponseAssignmentService) {}


  @Get(':id/:idstudent')
  getTask(@Param('id') id, @Param('isstudent') idstudent) {
    return this.responseAssignmentService.getResponse(id, idstudent);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateResponseAssignmentDto: UpdateResponseAssignmentDto) {
    return this.responseAssignmentService.update(id, updateResponseAssignmentDto)
  }

  @Patch('validate/:id')
  validate(@Param('id') id, @Body() validateResponseAssignmentDto: ValidateResponseAssignmentDto) {
    return this.responseAssignmentService.update(id, validateResponseAssignmentDto)
  }
}
