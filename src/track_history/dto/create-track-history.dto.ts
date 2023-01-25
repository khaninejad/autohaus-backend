import { IsString } from 'class-validator';

export class CreateTrackHistoryDto {
  @IsString()
  _id?: string;

  @IsString()
  action: string;

  @IsString()
  employee: string;

  @IsString()
  user: string;

  @IsString()
  created_at: string;
}
