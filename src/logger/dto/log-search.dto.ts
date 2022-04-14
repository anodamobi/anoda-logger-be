import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LogSearchDto {
  @IsString()
  @IsNotEmpty()
      level: string;

  @IsString()
  @IsNotEmpty()
      project: string;

  @IsOptional()
  @IsNumber()
      offset: number;
}
