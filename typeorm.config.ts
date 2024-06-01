import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DatabaseContext } from './src/modules/database/contexts/database.context';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService({});

const databaseContext = new DatabaseContext();
databaseContext.determineStrategy(configService.getOrThrow('NODE_ENV'));
const databaseConfig = databaseContext.getDatabaseConfig(configService);

export default new DataSource(databaseConfig);
