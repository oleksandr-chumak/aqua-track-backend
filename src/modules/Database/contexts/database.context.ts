import { ConfigService } from '@nestjs/config';
import { DatabaseStrategy } from '../interfaces/database-strategy.interface';
import { DevelopmentDatabaseStrategy } from '../strategies/development-database.strategy';
import { TestDatabaseStrategy } from '../strategies/test-database.strategy';
import { ProductionDatabaseStrategy } from '../strategies/production-database.strategy';
import { DataSourceOptions } from 'typeorm';

export class DatabaseContext implements DatabaseStrategy {
  private strategy: DatabaseStrategy;

  constructor(strategy: DatabaseStrategy = new DevelopmentDatabaseStrategy()) {
    this.strategy = strategy;
  }

  public getDatabaseConfig(
    config: ConfigService<Record<string, unknown>>,
  ): DataSourceOptions {
    return this.strategy.getDatabaseConfig(config);
  }

  public setStrategy(strategy: DatabaseStrategy) {
    this.strategy = strategy;
  }

  public determineStrategy(nodeEnv: string) {
    switch (nodeEnv) {
      case 'development':
        this.setStrategy(new DevelopmentDatabaseStrategy());
        break;
      case 'test':
        this.setStrategy(new TestDatabaseStrategy());
        break;
      case 'production':
        this.setStrategy(new ProductionDatabaseStrategy());
        break;
      default:
        throw new Error(`Invalid NODE_ENV value ${nodeEnv}`);
    }
  }
}
