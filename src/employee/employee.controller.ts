import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return await this.employeeService.create(employeeDto);
  }
  @Get()
  async getAllEmployee() {
    return await this.employeeService.getAllEmployee();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getSpecificEmployee(Number(id));
  }

  @Put('edit/:id')
  async editEmployee(
    @Param('id') id: string,
    @Body() data: Partial<EmployeeDto>,
  ) {
    return await this.employeeService.editEmployee(Number(id), data);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(Number(id));
  }
}
