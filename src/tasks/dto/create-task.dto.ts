import { IsBoolean, IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsDate()
  @IsNotEmpty()
  dateCreated: Date;

  @IsDate()
  dateCompleted: Date;
}
