import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { PolicyRequestsService } from './policy-requests.service';
import { CreatePolicyRequestDto } from './dto/create-policy-request.dto';
import { UpdatePolicyStatusDto } from './dto/update-policy-status.dto';
import { PolicyStatus } from './entities/policy-request.entity';

@Controller('policy-requests')
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
  updateStatus(
    @Param('id') id: string, 
    @Body() updatePolicyStatusDto: UpdatePolicyStatusDto
  ) {
    return this.policyRequestsService.updateStatus(id, updatePolicyStatusDto.status);
  }
}