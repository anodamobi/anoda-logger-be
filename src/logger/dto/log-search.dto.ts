import { IsArray, IsDateString, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ELevel } from '../../_shared/interfaces';

export class LogSearchDto {
  @IsOptional()
  @IsInt()
  @IsIn([1, -1])
  @Type(() => {
      return Number;
  })
      order = 1;

  @IsString()
  @IsOptional()
      traceId: string;

  @IsString()
  @IsOptional()
      env: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
      context: string[];

  @IsOptional()
  @IsEnum(ELevel, { each: true })
  @IsArray()
      level: ELevel[];

  @IsString()
  @IsNotEmpty()
      project: string;

  @IsInt()
  @IsOptional()
  @Type(() => {
      return Number;
  })
  @Min(1)
      page = 1;

  @IsDateString()
  @IsOptional()
      dateFrom: string;

  @IsDateString()
  @IsOptional()
      dateUntil: string;

  @IsOptional()
  @IsIn([10, 25, 50, 100])
  @IsInt()
  @Type(() => {
      return Number;
  })
      limit = 25;
}
