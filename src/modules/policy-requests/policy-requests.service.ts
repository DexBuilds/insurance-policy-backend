import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PolicyRequest, PolicyStatus } from './entities/policy-request.entity';
import { CreatePolicyRequestDto } from './dto/create-policy-request.dto';

@Injectable()
export class PolicyRequestsService {
  constructor(
    @InjectRepository(PolicyRequest)
    private readonly policyRepository: Repository<PolicyRequest>,
  ) {}

  async create(createDto: CreatePolicyRequestDto): Promise<PolicyRequest> {
    const existingPolicy = await this.policyRepository.findOne({ where: { folio: createDto.folio } });
    if (existingPolicy) {
      throw new BadRequestException(`El folio ${createDto.folio} ya existe`);
    }

    const newPolicy = this.policyRepository.create(createDto);
    return await this.policyRepository.save(newPolicy);
  }

  async findAll(status?: PolicyStatus, customerName?: string, folio?: string, limit: number = 10, page: number = 1) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (customerName) where.customerName = Like(`%${customerName}%`);
    if (folio) where.folio = Like(`%${folio}%`);

    const [data, total] = await this.policyRepository.findAndCount({
      where,
      take: limit,
      skip: skip,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<PolicyRequest> {
    const policy = await this.policyRepository.findOne({ where: { id } });
    if (!policy) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    return policy;
  }

  async updateStatus(id: string, newStatus: PolicyStatus): Promise<PolicyRequest> {
    const policy = await this.findOne(id);

    if (policy.status === PolicyStatus.ISSUED && newStatus === PolicyStatus.PENDING) {
      throw new BadRequestException('No se permite cambiar una solicitud de ISSUED a PENDING');
    }

    policy.status = newStatus;
    
    return await this.policyRepository.save(policy);
  }
}
