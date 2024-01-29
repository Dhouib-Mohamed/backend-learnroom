import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import {ResponseTaskService} from './response_task.service';
import { RoleGuard } from "../authentification/role.guard";
import { GetUser } from "../authentification/get-user.decorator";
import { TokenUser } from "../authentification/user.service";
import { Role } from "../authentification/role.enum";


@Controller('response-task')
export class ResponseTaskController {
  constructor(private readonly responseTaskService: ResponseTaskService) {}
  @Get(':id')
  @UseGuards(RoleGuard(Role.Student))
  getTask(@Param('id') id, @GetUser() user:TokenUser) {
    return  this.responseTaskService.getResponseTask(id,user.id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Student))
  async update(@Param('id') id ) {
    const resp = await this.responseTaskService.findOne(id)
    return this.responseTaskService.update(id,{completed : !resp.completed } )
  }
}
