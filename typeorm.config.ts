import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DatabaseContext } from './src/modules/Database/contexts/database.context';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService({});

const databaseContext = new DatabaseContext();
databaseContext.determineStrategy(configService.get('NODE_ENV'));
const databaseConfig = databaseContext.getDatabaseConfig(configService);

export default new DataSource(databaseConfig);
