import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateTaskDto {

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

}