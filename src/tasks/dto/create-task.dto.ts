import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateIf((_, value: unknown) => value !== undefined)
  @IsString()
  description?: string;

  @ValidateIf((_, value: unknown) => value !== undefined)
  @IsNumber()
  priority?: number;

  @ValidateIf((_, value: unknown) => value !== undefined)
  @IsBoolean()
  completed?: boolean;

  @IsMongoId()
  userId: string;
}
