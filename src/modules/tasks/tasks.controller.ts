import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TaskDataService } from './data/taskData.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTaskDto,
  FilterTaskDto,
  JobResponseDto,
  UpdateReportDto,
  UpdateStatusDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from './dtos/tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskDataService: TaskDataService) {}

  @Post('create')
  async create(@Body(ValidationPipe) data: CreateTaskDto, @Req() req: any) {
    const brand = req.brand;
    data.brand_id = brand.id;
    return await this.taskDataService.create(data);
  }

  @Get('next')
  async findNextTask(@Query() query: { contractAddress: string }) {
    return await this.taskDataService.findNextTask(query.contractAddress);
  }

  @Get('active')
  async findActiveTasks(@Query(ValidationPipe) query: FilterTaskDto) {
    return await this.taskDataService.findActiveTasks(query);
  }

  @Get(':task_id')
  async findOne(@Param('task_id') task_id: number) {
    return await this.taskDataService.getTaskById(task_id);
  }

  //TODO:   create join task dto and validate
  @Post('join')
  async joinTask(
    @Body(ValidationPipe) data: { task_id: number },
    @Req() req: any,
  ) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskDataService.joinTask(data.task_id, user?.id);
  }

  //TODO:   create join task dto and validate
  @Post('next_step')
  async moveStep(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskDataService.moveToSecondStep(user?.id, data.task_id);
  }

  //TODO:   create join task dto and validate
  @Get('joined_tasks')
  async getUsersTasks(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Req() req: any,
  ) {
    const user = req.user;

    return await this.taskDataService.getUsersTasks(user?.id, page, limit);
  }

  @Get('joined_tasks/:task_id')
  async getUsersSingleTasks(
    @Param('task_id', ParseIntPipe) task_id: number,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this.taskDataService.getUsersSingleTasks(user?.id, task_id);
  }

  @Post('complete_user_task')
  async completeTask(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskDataService.completeUserTask(data.task_id, user?.id);
  }

  @Get('brandTasks')
  async findBrandTasks(@Req() req: any) {
    const brand = req.brand;
    return await this.taskDataService.getBrandTasks(brand.id);
  }

  @Put('update')
  async update(
    @Body(ValidationPipe) data: UpdateTaskDto,
    @Param() params: { id: number },
    @Req() req: any,
  ) {
    const brand = req.brand;
    data.brand_id = brand.id;

    return await this.taskDataService.update(params.id, data);
  }

  @Put('updateStatus')
  async updateStatus(
    @Body(ValidationPipe) data: UpdateStatusDto,
    @Param() params: { id: number },
  ) {
    return await this.taskDataService.updateStatus(params.id, data);
  }

  @Put('updateReport')
  async updateReport(
    @Body(ValidationPipe) data: UpdateReportDto,
    @Param() params: { id: number },
  ) {
    return await this.taskDataService.updateReport(params.id, data);
  }

  @Post('respond')
  async respondToTask(@Body() body: UpdateTaskResponseDto, @Req() req: any) {
    if (req.user) {
      const user = req.user;
      body.user_id = user?.id;
    }

    return await this.taskDataService.respondToTask(body);
  }

  @Get('activities/:task_id')
  async getWinners(
    @Param()
    { task_id, limit, page }: { task_id: number; page: number; limit: number },
  ) {
    return await this.taskDataService.getWinners(task_id, page, limit);
  }

  @Get('manifest')
  async getManifestFile() {
    return await this.taskDataService.sendResponseToJobLauncher();
  }

  @Get('get_manifest')
  async getManifest(@Query() query: { url: string }) {
    return await this.taskDataService.getTaskManifestDetails(query.url);
  }

  @Post('new_response')
  async newResponse(@Body() body: JobResponseDto) {
    return await this.taskDataService.storeNewResponse(body);
  }

  @Get('get_responses')
  async getResponses(@Query() query: { escrowAddress: string }) {
    return await this.taskDataService.getStoredResponses(query.escrowAddress);
  }

  @Get('check_escrow')
  async checkEscrow(@Query() query: { escrowAddress: string }) {
    return await this.taskDataService.checkIfIsExistingEscrow(
      query.escrowAddress,
    );
  }

  //TODO: create the dto
  @Post('check_if_submitted')
  async checkIfSubmitted(
    @Body(ValidationPipe)
    body: {
      escrowAddress: string;
      workerAddress: string;
    },
  ) {
    return await this.taskDataService.checkIfWorkerHadSubmittedAResponse(
      body.workerAddress,
      body.escrowAddress,
    );
  }
}
