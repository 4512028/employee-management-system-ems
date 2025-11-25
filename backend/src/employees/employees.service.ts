import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const emp = this.employeeRepository.create(dto);
    return this.employeeRepository.save(emp);
  }

  async findAll(
    search?: string,
    minSalary?: number,
    maxSalary?: number,
    page = 1,
    limit = 10
  ) {
    const where: any = {};
    if (search) where.name = Like(`%${search}%`);
    if (minSalary !== undefined && maxSalary !== undefined) {
      where.salary = Between(minSalary, maxSalary);
    } else if (minSalary !== undefined) {
      where.salary = Between(minSalary, Number.MAX_SAFE_INTEGER);
    } else if (maxSalary !== undefined) {
      where.salary = Between(0, maxSalary);
    }

    const [data, total] = await this.employeeRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }
}
