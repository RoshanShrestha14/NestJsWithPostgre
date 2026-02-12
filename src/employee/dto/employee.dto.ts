import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  fistname: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  department: string;
}
