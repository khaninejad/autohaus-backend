import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { Department, DepartmentDocument } from './department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let departmentModel: Model<DepartmentDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getModelToken(Department.name),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<DepartmentService>(DepartmentService);
    departmentModel = module.get<Model<DepartmentDocument>>(
      getModelToken(Department.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if department insertion fails', async () => {
      jest.spyOn(departmentModel, 'create').mockImplementation(() => {
        throw new Error('insertion error');
      });
      try {
        await service.create({
          name: 'Department 1',
          description: 'Department Description',
        });
      } catch (error) {
        expect(error.message).toEqual('insertion error');
      }
    });
  });
});
