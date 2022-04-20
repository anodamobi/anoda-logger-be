import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
      traceId: string;
}
