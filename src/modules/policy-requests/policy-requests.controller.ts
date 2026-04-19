import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PolicyRequestsService } from './policy-requests.service';
import { CreatePolicyRequestDto } from './dto/create-policy-request.dto';
import { UpdatePolicyStatusDto } from './dto/update-policy-status.dto';
import { PolicyStatus } from './entities/policy-request.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Policy Requests')
@ApiBearerAuth()
@Controller('policy-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PolicyRequestsController {
  constructor(private readonly policyRequestsService: PolicyRequestsService) {}

  @Post()
  create(@Body() createPolicyRequestDto: CreatePolicyRequestDto) {
    return this.policyRequestsService.create(createPolicyRequestDto);
  }

  @Get()
  findAll(
    @Query('status') status?: PolicyStatus,
    @Query('customerName') customerName?: string,
    @Query('folio') folio?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {

    const limitParsed = limit ? +limit : 10;
    const pageParsed = page ? +page : 1;
    return this.policyRequestsService.findAll(status, customerName, folio, limitParsed, pageParsed);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyRequestsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles('admin', 'supervisor')
  updateStatus(
    @Param('id') id: string, 
    @Body() updatePolicyStatusDto: UpdatePolicyStatusDto
  ) {
    return this.policyRequestsService.updateStatus(id, updatePolicyStatusDto.status);
  }
}