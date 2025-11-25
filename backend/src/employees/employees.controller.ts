import { Controller, Get, Post, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Create new employee
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  // Get all employees with optional search, salary filter, pagination
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('minSalary') minSalary?: string,
    @Query('maxSalary') maxSalary?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    const min = minSalary ? parseInt(minSalary) : undefined;
    const max = maxSalary ? parseInt(maxSalary) : undefined;

    return this.employeesService.findAll(
      search,
      min,
      max,
      parseInt(page),
      parseInt(limit)
    );
  }
}
