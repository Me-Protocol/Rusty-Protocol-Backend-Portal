import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('twitter-api-sdk');

const { TWITTER_BREARER_TOKEN } = process.env;

const client = new Client(TWITTER_BREARER_TOKEN);

@Injectable()
export class TasksResultService {
  constructor(
    private readonly followService: FollowerService,
    private readonly likeService: LikesService,
    private readonly shareService: SharesService,
    private readonly collectionService: CollectionsService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
}
