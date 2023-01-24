import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  _id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
