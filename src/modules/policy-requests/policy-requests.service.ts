import { Injectable } from '@nestjs/common';
import { CreatePolicyRequestDto } from './dto/create-policy-request.dto';
import { UpdatePolicyRequestDto } from './dto/update-policy-request.dto';

@Injectable()
export class PolicyRequestsService {
  create(createPolicyRequestDto: CreatePolicyRequestDto) {
    return 'This action adds a new policyRequest';
  }

  findAll() {
    return `This action returns all policyRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policyRequest`;
  }

  update(id: number, updatePolicyRequestDto: UpdatePolicyRequestDto) {
    return `This action updates a #${id} policyRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} policyRequest`;
  }
}
