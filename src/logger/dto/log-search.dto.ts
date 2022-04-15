import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class LogSearchDto {
  @IsString()
  @IsNotEmpty()
      level: string;

  @IsString()
  @IsNotEmpty()
      project: string;

  @IsOptional()
  @IsNumberString()
      offset: number;
}
