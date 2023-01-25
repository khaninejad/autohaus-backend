import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const createdEmployee = new this.employeeModel(createEmployeeDto);
      return createdEmployee.save();
    } catch (error) {
      throw new Error('insertion error');
    }
  }

  findAll() {
    return this.employeeModel.find().exec();
  }

  findOne(id: string) {
    try {
      return this.employeeModel.findOne({ _id: id }).exec();
    } catch (error) {
      throw new Error('unexpected error');
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.updateOne({ _id: id }, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.employeeModel.deleteOne({ _id: id });
  }
}
