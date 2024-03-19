import { Inject, Injectable } from '@nestjs/common';
import { AMPLITUDE_CONFIG } from './config';

@Injectable()
export class AmplitudeService<T extends {} = {}> {
  constructor(@Inject(AMPLITUDE_CONFIG) private readonly config: T) {}
}
