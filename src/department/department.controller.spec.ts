import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';
import { Department } from './department.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        DepartmentService,
        UserService,
        {
          provide: getModelToken(Department.name),
          useValue: {
            create: () => Promise.resolve(),
            findOne: () => Promise.resolve(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            create: () => Promise.resolve(),
            findOne: () => Promise.resolve(),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call departmentService.create with the correct parameter', async () => {
      const createDepartmentDto = {
        name: 'Department 1',
        description: 'Department Description',
      };
      const createSpy = jest.spyOn(service, 'create').mockImplementation();
      jest.spyOn(controller, 'checkPermission').mockImplementation();
      await controller.create(
        createDepartmentDto,
        new Request('http://localhost'),
      );
      expect(createSpy).toHaveBeenCalledWith(createDepartmentDto);
    });
  });

  describe('findAll', () => {
    it('should call departmentService.findAll', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockImplementation();
      await controller.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call departmentService.findOne with the correct parameter', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockImplementation();
      await controller.findOne('1');
      expect(findOneSpy).toHaveBeenCalledWith('1');
    });
  });
});
