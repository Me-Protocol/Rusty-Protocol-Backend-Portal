import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskDataService } from './data/data.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskDataService: TaskDataService) {}

  @Get('next')
  async findNextTask(@Query() query: { contractAddress: string }) {
    return await this.taskDataService.findNextTask(query.contractAddress);
  }

  @Get('active')
  async findActiveTasks(@Query() query: FilterTaskDto) {
    return await this.taskDataService.findActiveTasks(query);
  }

  @Get(':task_id')
  async findOne(@Param('task_id') task_id: number) {
    return await this.taskDataService.getTaskById(task_id);
  }

  @Post('join')
  async joinTask(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskDataService.joinTask(data.task_id, user?.id);
  }

  @Post('next_step')
  async moveStep(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskDataService.moveToSecondStep(user?.id, data.task_id);
  }

  @Get('joined_tasks')
  async getUsersTasks(
    @Query()
    query: {
      page: number;
      limit: number;
    },
    @Req() req: any,
  ) {
    const user = req.user;

    return await this.taskDataService.getUsersTasks(
      user?.id,
      query.page,
      query.limit,
    );
  }

  @Get('joined_tasks/:task_id')
  async getUsersSingleTasks(
    @Req() req: any,
    @Param('task_id') task_id: number,
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

  @Post('create')
  async create(@Body() data: CreateTaskDto, @Req() req: any) {
    const brand = req.brand;
    data.brand_id = brand.id;
    return await this.taskDataService.create(data);
  }

  @Get('brandTasks')
  async findBrandTasks(@Req() req: any) {
    const brand = req.brand;
    return await this.taskDataService.getBrandTasks(brand.id);
  }

  @Put('update')
  async update(
    @Body() data: UpdateTaskDto,
    @Param() params: { id: number },
    @Req() req: any,
  ) {
    const brand = req.brand;
    data.brand_id = brand.id;

    return await this.taskDataService.update(params.id, data);
  }

  @Put('updateStatus')
  async updateStatus(
    @Body() data: UpdateStatusDto,
    @Param() params: { id: number },
  ) {
    return await this.taskDataService.updateStatus(params.id, data);
  }

  @Put('updateReport')
  async updateReport(
    @Body() data: UpdateReportDto,
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

  @Post('check_if_submitted')
  async checkIfSubmitted(
    @Body() body: { escrowAddress: string; workerAddress: string },
  ) {
    return await this.taskDataService.checkIfWorkerHadSubmittedAResponse(
      body.workerAddress,
      body.escrowAddress,
    );
  }
}
