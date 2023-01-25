import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  _id?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  address: string;

  @IsString()
  job_title: string;

  @IsString()
  department?: string;
}
