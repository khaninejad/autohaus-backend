import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './employee.schema';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    private departmentService: DepartmentService,
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
    return this.employeeModel.find().populate('department').exec();
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

  async parse(uploadedPath: string) {
    const csvFilePath = path.resolve(uploadedPath);
    const headers = [
      'Vorname',
      'Nachname',
      'Strasse',
      'Nr',
      'PLZ',
      'Ort',
      'Land',
      'Position',
      'Abteilung',
    ];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      async (error, result: any[]) => {
        if (error) {
          console.error(error);
        }
        for await (const item of result) {
          const department_id = await this.checkDepartmentExist(item.Abteilung);
          this.create({
            first_name: item.Vorname,
            last_name: item.Nachname,
            job_title: item.Position,
            address: JSON.stringify({
              street: item.Strasse,
              Nr: item.Nr,
              PLZ: item.PLZ,
              Ort: item.Ort,
              Land: item.Land,
            }),
            department: department_id,
          });
        }
      },
    );
  }

  private async checkDepartmentExist(item: string): Promise<string> {
    if (item === '') return null;

    let department_id = '';
    const department = await this.departmentService.findByName(item);
    if (!department) {
      const created = await this.departmentService.create({
        name: item,
        description: '',
      });
      department_id = created._id;
    } else {
      department_id = department._id;
    }
    return department_id;
  }
}
