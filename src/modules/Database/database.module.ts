import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseContext } from './contexts/database.context';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseContext = new DatabaseContext();
        databaseContext.determineStrategy(config.get('NODE_ENV'));
        return databaseContext.getDatabaseConfig(config);
      },
    }),
  ],
})
export class DatabaseModule {}
