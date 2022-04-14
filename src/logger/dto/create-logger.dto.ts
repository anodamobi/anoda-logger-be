import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LogDataDto } from './log-data.dto';

export class CreateLoggerDto {
    @IsString()
    @IsNotEmpty()
        project: string;

    @ValidateNested()
    @Type(() => {
        return LogDataDto;
    })
        logData: LogDataDto;
}
