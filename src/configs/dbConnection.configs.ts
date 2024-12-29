import mongoose, { ConnectOptions, Connection, connect } from 'mongoose';
import Logger from 'utils/logger';
import winston from 'winston';
import { DB_DATABASE, DB_URI } from './envValidator.configs';

const dbOptions: ConnectOptions = { directConnection: true };
const dbConnectionConfigs = {
  uri: `${DB_URI}/${DB_DATABASE}`,
  options: dbOptions,
};

class DatabaseConnection {
  private connection!: Connection;
  private logger: winston.Logger;

  constructor() {
    this.logger = Logger.getLogger();
  }

  public async connect(): Promise<void> {
    try {
      await connect(dbConnectionConfigs.uri, dbConnectionConfigs.options);
      this.connection = mongoose.connection;
      this.logger.info('Connected to database');
    } catch (error) {
      this.logger.error(`Error connecting to database: ${error}`);
      throw error;
    }
  }

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connection not established!');
    }
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.logger.info('Database connection closed');
    } catch (error) {
      throw new Error('Database connection not closed');
    }
  }
}

export default DatabaseConnection;
