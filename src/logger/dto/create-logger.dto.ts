import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateLoggerDto {
    @IsString()
    @IsNotEmpty()
    project: string;

    @IsString()
    @IsNotEmpty()
    context: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    level: string;

    @IsDate()
    @IsNotEmpty()
    date: string;
}
