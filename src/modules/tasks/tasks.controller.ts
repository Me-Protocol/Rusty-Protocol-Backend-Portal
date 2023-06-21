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
import { TasksService } from './tasks/tasks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Get('next')
  async findNextTask(@Query() query: { contractAddress: string }) {
    return await this.taskService.findNextTask(query.contractAddress);
  }

  @UseGuards(VerifyLogin)
  @Get('active')
  async findActiveTasks(@Query() query: FilterTaskDto) {
    return await this.taskService.findActiveTasks(query);
  }

  @UseGuards(VerifyLogin)
  @Get(':task_id')
  async findOne(@Param('task_id') task_id: number) {
    return await this.taskService.getTaskById(task_id);
  }

  @UseGuards(VerifyLogin)
  @Post('join')
  async joinTask(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskService.joinTask(data.task_id, user?.id);
  }

  @UseGuards(VerifyLogin)
  @Post('next_step')
  async moveStep(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskService.moveToSecondStep(user?.id, data.task_id);
  }

  @UseGuards(VerifyLogin)
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

    return await this.taskService.getUsersTasks(
      user?.id,
      query.page,
      query.limit,
    );
  }

  @UseGuards(VerifyLogin)
  @Get('joined_tasks/:task_id')
  async getUsersSingleTasks(
    @Req() req: any,
    @Param('task_id') task_id: number,
  ) {
    const user = req.user;

    return await this.taskService.getUsersSingleTasks(user?.id, task_id);
  }

  @UseGuards(VerifyLogin)
  @Post('complete_user_task')
  async completeTask(@Body() data: { task_id: number }, @Req() req: any) {
    const user = req.user;

    if (!data?.task_id) throw new HttpException('Task ID is required', 400);

    return await this.taskService.completeUserTask(data.task_id, user?.id);
  }

  @Roles(Role.BrandAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(BrandAdminGuard)
  @Post('create')
  async create(@Body() data: CreateTaskDto, @Req() req: any) {
    const brand = req.brand;
    data.brand_id = brand.id;
    return await this.taskService.create(data);
  }

  @Roles(Role.BrandAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(BrandAdminGuard)
  @Get('brandTasks')
  async findBrandTasks(@Req() req: any) {
    const brand = req.brand;
    return await this.taskService.getBrandTasks(brand.id);
  }

  @Roles(Role.BrandAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(BrandAdminGuard)
  @Put('update')
  async update(
    @Body() data: UpdateTaskDto,
    @Param() params: { id: number },
    @Req() req: any,
  ) {
    const brand = req.brand;
    data.brand_id = brand.id;

    return await this.taskService.update(params.id, data);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Put('updateStatus')
  async updateStatus(
    @Body() data: UpdateStatusDto,
    @Param() params: { id: number },
  ) {
    return await this.taskService.updateStatus(params.id, data);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Put('updateReport')
  async updateReport(
    @Body() data: UpdateReportDto,
    @Param() params: { id: number },
  ) {
    return await this.taskService.updateReport(params.id, data);
  }

  @UseGuards(VerifyLogin)
  @Post('respond')
  async respondToTask(@Body() body: UpdateTaskResponseDto, @Req() req: any) {
    if (req.user) {
      const user = req.user;
      body.user_id = user?.id;
    }

    return await this.taskService.respondToTask(body);
  }

  @UseGuards(VerifyLogin)
  @Get('activities/:task_id')
  async getWinners(
    @Param()
    { task_id, limit, page }: { task_id: number; page: number; limit: number },
  ) {
    return await this.taskService.getWinners(task_id, page, limit);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Get('manifest')
  async getManifestFile() {
    return await this.taskService.sendResponseToJobLauncher();
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Get('get_manifest')
  async getManifest(@Query() query: { url: string }) {
    return await this.taskService.getTaskManifestDetails(query.url);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Post('new_response')
  async newResponse(@Body() body: JobResponseDto) {
    return await this.taskService.storeNewResponse(body);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Get('get_responses')
  async getResponses(@Query() query: { escrowAddress: string }) {
    return await this.taskService.getStoredResponses(query.escrowAddress);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Get('check_escrow')
  async checkEscrow(@Query() query: { escrowAddress: string }) {
    return await this.taskService.checkIfIsExistingEscrow(query.escrowAddress);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(AdminGuard)
  @Post('check_if_submitted')
  async checkIfSubmitted(
    @Body() body: { escrowAddress: string; workerAddress: string },
  ) {
    return await this.taskService.checkIfWorkerHadSubmittedAResponse(
      body.workerAddress,
      body.escrowAddress,
    );
  }
}
