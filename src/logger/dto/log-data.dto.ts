import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ELevel } from '../../_shared/interfaces';

export class LogDataDto {
  @IsString()
  @IsOptional()
      message: string;

  @IsString()
  @IsOptional()
      context: string;

  @IsDateString()
  @IsNotEmpty()
      timestamp: string;

  @IsOptional()
  @IsEnum(ELevel)
      level: ELevel;

  @IsString()
  @IsOptional()
      traceId: string;

  @IsString()
  @IsOptional()
      env: string;
}
