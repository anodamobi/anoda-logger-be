import { IsArray, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchPaginationDto {
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
    @Min(1)
    limit = 25;


    // @IsOptional()
    // @IsIn(['acs', 'desc'])
    //     sort: string;

    @IsOptional()
    @IsString()
    search: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags: string[];
}

