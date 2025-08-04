import { IsEnum, IsOptional } from "class-validator";
import { Estado } from "../enum/estado.enum";

export class UpdateTodoStatusDto {
    @IsOptional()
    @IsEnum(Estado)
    status: string;
}