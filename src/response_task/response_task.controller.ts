import {Controller, Get, Param, Patch} from '@nestjs/common';
import {ResponseTaskService} from './response_task.service';


@Controller('response-task')
export class ResponseTaskController {
  constructor(private readonly responseTaskService: ResponseTaskService) {}
@Get(':id/:idstudent')
getTask(@Param('id') id, @Param('idstudent') idstudent) {
  return  this.responseTaskService.getResponseTask(id,idstudent);
}

  @Patch(':id')
  async update(@Param('id') id ) {
    const resp = await this.responseTaskService.findOne(id)
    return this.responseTaskService.update(id,{completed : !resp.completed } )
  }
}
