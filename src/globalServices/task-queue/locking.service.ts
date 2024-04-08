// locking.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LockingService {
  private jobs: string[] = [];

  lock(name: string): boolean {
    if (this.jobs.includes(name)) {
      return false;
    }

    this.jobs.push(name);
    return true;
  }

  unlock(name: string): void {
    this.jobs = this.jobs.filter((job) => job !== name);
  }
}
