import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyRequestDto } from './create-policy-request.dto';

export class UpdatePolicyRequestDto extends PartialType(CreatePolicyRequestDto) {}
