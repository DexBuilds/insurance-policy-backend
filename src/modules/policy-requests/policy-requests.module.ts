import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyRequestsService } from './policy-requests.service';
import { PolicyRequestsController } from './policy-requests.controller';
import { PolicyRequest } from './entities/policy-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PolicyRequest])],
  controllers: [PolicyRequestsController],
  providers: [PolicyRequestsService],
})
export class PolicyRequestsModule {}
