import { DataSourceOptions } from 'typeorm';

export const BASE_DATABASE_CONFIG: Partial<DataSourceOptions> = {
  migrations: ['migrations/*.js'],
  logging: ['error'],
  synchronize: false,
};
