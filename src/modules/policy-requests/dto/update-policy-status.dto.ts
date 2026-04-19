import { IsEnum, IsNotEmpty } from 'class-validator';
import { PolicyStatus } from '../entities/policy-request.entity';

export class UpdatePolicyStatusDto {
  @IsEnum(PolicyStatus, { 
    message: 'El status debe ser PENDING, VALIDATED, ISSUED o REJECTED' 
  })
  @IsNotEmpty()
  status!: PolicyStatus;
}