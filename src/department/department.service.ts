import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const createdDepartment = new this.departmentModel(createDepartmentDto);
      return createdDepartment.save();
    } catch (error) {
      throw new Error('insertion error');
    }
  }

  findAll() {
    return this.departmentModel.find().exec();
  }

  findOne(id: string) {
    try {
      return this.departmentModel.findOne({ _id: id }).exec();
    } catch (error) {
      throw new Error('unexpected error');
    }
  }
  findByName(name: string) {
    try {
      return this.departmentModel.findOne({ name: name }).select('_id');
    } catch (error) {
      throw new Error('unexpected error');
    }
  }
}
