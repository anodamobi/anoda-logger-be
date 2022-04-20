import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class LogSearchDto {
  @IsString()
  @IsOptional()
      traceId: string;

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

  @IsOptional()
  @IsIn([10, 25, 50, 100])
  @IsInt()
  @Type(() => {
      return Number;
  })
      limit = 25;
}
