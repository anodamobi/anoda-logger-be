import { IsString, IsNotEmpty } from 'class-validator';

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
}
