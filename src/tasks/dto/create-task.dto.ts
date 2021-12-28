import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição da task',
  })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsIn([true, false])
  @ApiPropertyOptional({
    description: 'Informa se a task já foi executada',
  })
  completed: boolean;

  @IsDate()
  @IsNotEmpty()
  dateCreated: Date;

  @IsDate()
  dateCompleted: Date;
}
