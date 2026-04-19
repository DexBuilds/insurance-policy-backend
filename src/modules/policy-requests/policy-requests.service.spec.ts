import { Test, TestingModule } from '@nestjs/testing';
import { PolicyRequestsService } from './policy-requests.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PolicyRequest, PolicyStatus } from './entities/policy-request.entity';
import { BadRequestException } from '@nestjs/common';

describe('PolicyRequestsService', () => {
  let service: PolicyRequestsService;

  const mockPolicyRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyRequestsService,
        {
          provide: getRepositoryToken(PolicyRequest),
          useValue: mockPolicyRepository,
        },
      ],
    }).compile();

    service = module.get<PolicyRequestsService>(PolicyRequestsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe lanzar BadRequestException al intentar cambiar de ISSUED a PENDING', async () => {
    const mockPolicy = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      status: PolicyStatus.ISSUED,
    };
    mockPolicyRepository.findOne.mockResolvedValue(mockPolicy);

    await expect(
      service.updateStatus('123e4567-e89b-12d3-a456-426614174000', PolicyStatus.PENDING)
    ).rejects.toThrow(BadRequestException);
  });
});