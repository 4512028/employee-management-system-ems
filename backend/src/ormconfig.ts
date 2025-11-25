import { DataSource } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'employee_db',
  entities: [Employee],
  synchronize: true, // dev only
});
