import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Estado } from "../enum/estado.enum";

export class CreateTaskDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @MinLength(5)
    description: string;

    @IsOptional()
    @IsEnum(Estado)
    status: string;

}
