import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;

  @IsInt()
  @Min(1)
  salary: number;
}
