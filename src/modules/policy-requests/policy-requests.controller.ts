import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolicyRequestsService } from './policy-requests.service';
import { CreatePolicyRequestDto } from './dto/create-policy-request.dto';
import { UpdatePolicyRequestDto } from './dto/update-policy-request.dto';

@Controller('policy-requests')
export class PolicyRequestsController {
  constructor(private readonly policyRequestsService: PolicyRequestsService) {}

  @Post()
  create(@Body() createPolicyRequestDto: CreatePolicyRequestDto) {
    return this.policyRequestsService.create(createPolicyRequestDto);
  }

  @Get()
  findAll() {
    return this.policyRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyRequestDto: UpdatePolicyRequestDto) {
    return this.policyRequestsService.update(+id, updatePolicyRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyRequestsService.remove(+id);
  }
}
