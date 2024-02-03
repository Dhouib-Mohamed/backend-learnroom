import {Body, Controller, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {ResponseAssignmentService} from './response_assignment.service';

import {CreateResponseAssignmentDto} from './dto/update-response_assignment.dto';
import {ValidateResponseAssignmentDto} from "./dto/validate-response_assignment.dto";
import { RoleGuard } from "../authentification/role.guard";
import { GetUser } from "../authentification/get-user.decorator";
import { TokenUser } from "../authentification/user.service";
import { Role } from "../authentification/role.enum";
import {ResponseAssignment} from "./entities/response_assignment.entity";

@Controller('response-assignment')
export class ResponseAssignmentController {
  constructor(private readonly responseAssignmentService: ResponseAssignmentService) {}

  @Get(':id')
  @UseGuards(RoleGuard(Role.Student))
  getTask(@Param('id') id, @GetUser() user:TokenUser) {
    return this.responseAssignmentService.getResponse(id, user.id);
  }

  @Get('all/:assignmentId')
  @UseGuards(RoleGuard())
  getTasks(@Param('assignmentId') assignmentId) {
    return this.responseAssignmentService.getResponses(assignmentId);
  }

  @Post(':assignmentId')
  @UseGuards(RoleGuard(Role.Student))
  create(@Param('assignmentId') assignmentId, @Body() createResponseAssignmentDto: CreateResponseAssignmentDto, @GetUser() user:TokenUser) {
    return this.responseAssignmentService.handleResponse(assignmentId, user.id, createResponseAssignmentDto);
  }
  @Patch('validate/:id')
  @UseGuards(RoleGuard(Role.Teacher))
  validate(@Param('id') id, @Body() validateResponseAssignmentDto: ValidateResponseAssignmentDto) {
    return this.responseAssignmentService.update(id, validateResponseAssignmentDto)
  }

}
