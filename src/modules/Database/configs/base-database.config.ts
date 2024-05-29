import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const BASE_DATABASE_CONFIG: Partial<DataSourceOptions> = {
  migrations: ['migrations/*.js'],
  logging: ['error'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
