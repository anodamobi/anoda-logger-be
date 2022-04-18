import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class LogSearchDto {
  @IsString()
  @IsOptional()
      level: string;

  @IsString()
  @IsNotEmpty()
      project: string;

  @IsOptional()
  @IsNumberString()
      offset: number;

  @IsNumberString()
  @IsNotEmpty()
      limit: number;
}
