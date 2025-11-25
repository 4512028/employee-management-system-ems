import { AppDataSource } from './ormconfig';
import { Employee } from './employees/entities/employee.entity';

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Employee);

  const employees = [
    { name: 'Alice Johnson', role: 'Developer', salary: 5000 },
    { name: 'Bob Smith', role: 'Designer', salary: 4000 },
    { name: 'Charlie Brown', role: 'Manager', salary: 7000 },
  ];

  for (const emp of employees) {
    await repo.save(repo.create(emp));
  }

  console.log('Seed completed');
  process.exit();
}

seed();
