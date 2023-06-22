@Module({
import { InappService } from './data/inapp/inapp.service';
import { OutappService } from './data/outapp/outapp.service';
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
  providers: [InappService, OutappService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
