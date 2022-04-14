import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class LogDataDto {
  @IsString()
  @IsNotEmpty()
      message: string;

  @IsString()
  @IsNotEmpty()
      context: string;

  @IsDate()
  @IsNotEmpty()
      timeOfIssue: string;

  @IsString()
  @IsNotEmpty()
      level: string;
}
