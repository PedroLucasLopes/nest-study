import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;
}
