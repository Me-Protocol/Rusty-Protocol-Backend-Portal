import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
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
import { TasksService } from '@src/globalServices/task/task.service';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskDataService: TasksService) {}

  @UseGuards(BrandJwtStrategy)
  @Post('create')
  async create(@Body(ValidationPipe) data: CreateTaskDto, @Req() req: any) {
    const brandId = req.user.brand.id;
    data.brand_id = brandId;

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
  async findOne(@Param('task_id', ParseUUIDPipe) task_id: string) {
    return await this.taskDataService.getTaskById(task_id);
  }

  @UseGuards(AuthGuard())
  @Post('join')
  async joinTask(
    @Body(ValidationPipe) data: { task_id: string },
    @Req() req: any,
  ) {
    const user = req.user;
    if (!data?.task_id) throw new HttpException('Task ID is required', 400);
    return await this.taskDataService.joinTask(data.task_id, user?.id);
  }

  @UseGuards(AuthGuard())
  @Post('next_step')
  async moveStep(@Body() data: { task_id: string }, @Req() req: any) {
    const user = req.user;
    if (!data?.task_id) throw new HttpException('Task ID is required', 400);
    return await this.taskDataService.moveToSecondStep(user?.id, data.task_id);
  }

  @UseGuards(AuthGuard())
  @Get('joined_tasks')
  async getUsersTasks(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this.taskDataService.getUsersTasks(user?.id, page, limit);
  }

  @UseGuards(AuthGuard())
  @Get('joined_tasks/:task_id')
  async getUsersSingleTasks(
    @Param('task_id', ParseIntPipe) task_id: string,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this.taskDataService.getUsersSingleTasks(user?.id, task_id);
  }

  @UseGuards(AuthGuard())
  @Post('complete_user_task')
  async completeTask(@Body() data: { task_id: string }, @Req() req: any) {
    const user = req.user;
    if (!data?.task_id) throw new HttpException('Task ID is required', 400);
    return await this.taskDataService.completeUserTask(data.task_id, user?.id);
  }

  @UseGuards(AuthGuard())
  @Get('brandTasks')
  async findBrandTasks(@Req() req: any) {
    const brand = req.brand;
    return await this.taskDataService.getBrandTasks(brand.id);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('update')
  async update(
    @Body(ValidationPipe) data: UpdateTaskDto,
    @Param(ValidationPipe) params: { id: string },
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    data.brand_id = brandId;
    return await this.taskDataService.update(params.id, data);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('updateStatus')
  async updateStatus(
    @Body(ValidationPipe) data: UpdateStatusDto,
    @Param(ValidationPipe) params: { id: string },
  ) {
    return await this.taskDataService.updateStatus(params.id, data);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('updateReport')
  async updateReport(
    @Body(ValidationPipe) data: UpdateReportDto,
    @Param() params: { id: string },
  ) {
    return await this.taskDataService.updateReport(params.id, data);
  }

  @UseGuards(AuthGuard())
  @Post('respond')
  async respondToTask(@Body() body: UpdateTaskResponseDto, @Req() req: any) {
    if (req.user) {
      const user = req.user;
      body.user_id = user?.id;
    }
    return await this.taskDataService.respondToTask(body);
  }

  @UseGuards(AuthGuard())
  @Get('activities/:task_id')
  async getWinners(
    @Param()
    { task_id, limit, page }: { task_id: string; page: number; limit: number },
  ) {
    return await this.taskDataService.getWinners(task_id, page, limit);
  }

  // @Get('manifest')
  // async getManifestFile() {
  //   return await this.taskDataService.sendResponseToJobLauncher();
  // }

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
