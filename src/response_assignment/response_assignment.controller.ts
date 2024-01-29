import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import {ResponseAssignmentService} from './response_assignment.service';

import {UpdateResponseAssignmentDto} from './dto/update-response_assignment.dto';
import {ValidateResponseAssignmentDto} from "./dto/validate-response_assignment.dto";
import { RoleGuard } from "../authentification/role.guard";
import { GetUser } from "../authentification/get-user.decorator";
import { TokenUser } from "../authentification/user.service";
import { Role } from "../authentification/role.enum";

@Controller('response-assignment')
export class ResponseAssignmentController {
  constructor(private readonly responseAssignmentService: ResponseAssignmentService) {}

  @Get(':id')
  @UseGuards(RoleGuard(Role.Student))
  getTask(@Param('id') id, @GetUser() user:TokenUser) {
    return this.responseAssignmentService.getResponse(id, user.id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Student))
  update(@Param('id') id, @Body() updateResponseAssignmentDto: UpdateResponseAssignmentDto) {
    return this.responseAssignmentService.update(id, updateResponseAssignmentDto)
  }

  @Patch('validate/:id')
  @UseGuards(RoleGuard(Role.Teacher))
  validate(@Param('id') id, @Body() validateResponseAssignmentDto: ValidateResponseAssignmentDto) {
    return this.responseAssignmentService.update(id, validateResponseAssignmentDto)
  }
}
