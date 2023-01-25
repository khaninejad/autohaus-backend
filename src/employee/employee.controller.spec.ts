import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackHistory } from '../track_history/track_history.schema';
import { TrackHistoryService } from '../track_history/track_history.service';
import { Department } from '../department/department.schema';
import { DepartmentService } from '../department/department.service';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.schema';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
        UserService,
        DepartmentService,
        TrackHistoryService,
        {
          provide: getModelToken(Employee.name),
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
          provide: getModelToken(Department.name),
          useValue: {
            create: () => Promise.resolve(),
            findOne: () => Promise.resolve(),
          },
        },
        {
          provide: getModelToken(TrackHistory.name),
          useValue: {
            create: () => Promise.resolve(),
            findByEmployee: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
