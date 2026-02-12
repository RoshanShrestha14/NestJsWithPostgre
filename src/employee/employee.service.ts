import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);

    return this.employeeRepository.save(employee);
  }

  async getAllEmployee(): Promise<Employee[]> {
    const allEmployee = await this.employeeRepository.find();
    return allEmployee;
  }

  async getSpecificEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) throw new NotFoundException('Employee Not Found');
    return employee;
  }

  async editEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    const employee = await this.getSpecificEmployee(id);
    const updatedEmployee = this.employeeRepository.merge(employee, data);
    return await this.employeeRepository.save(updatedEmployee);
  }

  async deleteEmployee(id: number): Promise<{ message: string }> {
    const employee = await this.getSpecificEmployee(id);
    console.log(`Employee  named ${employee.firstName} is deleted`);
    const result = await this.employeeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Employee Not Found');
    }

    return { message: 'Employee deleted successfully' };
  }
}
