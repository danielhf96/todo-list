import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @MinLength(5)
  readonly content: string;
}
