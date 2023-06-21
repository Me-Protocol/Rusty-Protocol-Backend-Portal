@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      TaskResponseEntity,
      TokenReward,
      BountyRecord,
      BountyEntity,
      BlockEntity,
      TaskResponseRecord,
      JobResponseEntity,
      TaskResponderEntity,
    ]),
    HttpModule,
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TasksModule {}
