import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]), // <--- Check the syntax here
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
// LINE 16: The error is reported here, but the mistake is likely above this line.
export class EmployeesModule {}
