import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  _id?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  street: string;

  @IsString()
  nr: string;

  @IsString()
  plz: string;

  @IsString()
  ort: string;

  @IsString()
  land: string;

  @IsString()
  job_title: string;

  @IsString()
  department?: string;
}
