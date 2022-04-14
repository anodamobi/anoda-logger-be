import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class LogDataDto {
  @IsString()
  @IsNotEmpty()
      message: string;

  @IsString()
  @IsNotEmpty()
      context: string;

  @IsDateString()
  @IsNotEmpty()
      timeOfIssue: string;

  @IsString()
  @IsNotEmpty()
      level: string;
}
