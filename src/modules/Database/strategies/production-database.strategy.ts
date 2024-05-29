import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { DataSourceOptions } from 'typeorm';
import { DatabaseStrategy } from '../interfaces/database-strategy.interface';
import { BASE_DATABASE_CONFIG } from '../configs/base-database.config';

export class ProductionDatabaseStrategy implements DatabaseStrategy {
  getDatabaseConfig(
    config: ConfigService<Record<string, unknown>>,
  ): DataSourceOptions {
    return {
      type: config.get('DATABASE_TYPE'),
      host: config.get('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get('DATABASE_USERNAME'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_NAME'),
      entities: [path.join(process.cwd(), 'dist/../**/*.entity.js')],
      ...BASE_DATABASE_CONFIG,
      migrationsRun: true,
    } as DataSourceOptions;
  }
}
