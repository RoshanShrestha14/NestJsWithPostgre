import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return await this.employeeService.create(employeeDto);
  }
}
