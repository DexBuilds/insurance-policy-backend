import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { PolicyRequestsController } from './../src/modules/policy-requests/policy-requests.controller';
import { PolicyRequestsService } from './../src/modules/policy-requests/policy-requests.service';
import { JwtAuthGuard } from './../src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './../src/modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PolicyRequestsController (e2e)', () => {
  let app: INestApplication;
  let mockUser = { email: 'admin@test.com', role: 'admin' };

  const mockPolicyService = {
    create: jest.fn().mockResolvedValue({ id: 'uuid-123', folio: 'POL-001', status: 'PENDING' }),
    updateStatus: jest.fn().mockResolvedValue({ id: 'uuid-123', status: 'ISSUED' }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PolicyRequestsController],
      providers: [
        { provide: PolicyRequestsService, useValue: mockPolicyService },
        { provide: CACHE_MANAGER, useValue: { get: jest.fn(), set: jest.fn() } },
      ],
    })

      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })

      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          const reflector = app.get(Reflector);
          const roles = reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
          ]);
          if (!roles) return true;
          return roles.includes(req.user.role);
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/policy-requests (POST) - Debe crear una solicitud exitosamente', () => {
    return request(app.getHttpServer())
      .post('/policy-requests')
      .send({
        folio: 'POL-001',
        customerName: 'Juan Perez',
        customerEmail: 'juan@test.com',
        product: 'Auto',
        insuredAmount: 15000,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.folio).toEqual('POL-001');
      });
  });

  it('/policy-requests (POST) - Debe fallar si insuredAmount es negativo', () => {
    return request(app.getHttpServer())
      .post('/policy-requests')
      .send({
        folio: 'POL-002',
        customerName: 'Maria Lopez',
        customerEmail: 'maria@test.com',
        product: 'Vida',
        insuredAmount: -500,
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('El insuredAmount debe ser mayor a 0');
      });
  });

  it('/policy-requests/:id/status (PATCH) - Debe denegar acceso a rol "user"', () => {
    mockUser = { email: 'user@test.com', role: 'user' };

    return request(app.getHttpServer())
      .patch('/policy-requests/uuid-123/status')
      .send({ status: 'ISSUED' })
      .expect(403);
  });
});