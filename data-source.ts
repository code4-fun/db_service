import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'postgres',
  password: 'postgres',
  database: 'db_service',
  entities: [User],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: "migrations",
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
