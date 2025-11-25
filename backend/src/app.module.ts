import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Docker host
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'employee_db',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeesModule,
    AuthModule,
  ],
})
export class AppModule {}
