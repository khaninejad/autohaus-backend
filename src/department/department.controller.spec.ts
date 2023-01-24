import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import configuration from '../shared/config';
import { getModelToken } from '@nestjs/mongoose';
import { Department } from './department.schema';

describe('DepartmentController', () => {
  let controller: DepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: configuration().secretKey,
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [DepartmentController],
      providers: [
        DepartmentService,
        {
          provide: getModelToken(Department.name),
          useValue: {
            create: () => Promise.resolve(),
            findOne: () => Promise.resolve(),
          },
        },],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
