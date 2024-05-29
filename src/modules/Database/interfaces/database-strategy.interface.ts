import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm/data-source';

export interface DatabaseStrategy {
  getDatabaseConfig: (
    config: ConfigService<Record<string, unknown>>,
  ) => DataSourceOptions;
}
