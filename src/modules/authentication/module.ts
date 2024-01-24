import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  exports: [],
  providers: [JwtService],
})
export class AuthenticationModule {}
