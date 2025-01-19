import express, { Application } from 'express';
import { Server, createServer } from 'http';
import winston from 'winston';

import loadEnvVariables, { PORT } from 'configs/envValidator.configs';
import DatabaseConnection from 'configs/dbConnection.configs';
import Logger from 'utils/logger';
import InitializeMiddleware from './initializeMiddleware';
import InitializeRoutes from './initializeRoutes';

class App {
  public app: Application;
  public port: string | number;
  public httpServer: Server;
  public dbConnection: DatabaseConnection;
  public logger: winston.Logger;

  constructor() {
    this.app = express();
    this.port = PORT || 3000;
    this.httpServer = createServer(this.app);
    this.app.set('port', this.port);
    this.dbConnection = new DatabaseConnection();
    this.logger = Logger.getLogger();

    this.initializeFunctions().catch(error => {
      this.logger.error(`Failed to initialize server: ${error.message}`);
      process.exit(1); // Exit the process with failure code
    });
  }

  /**
   * Initializes the necessary components for the application
   */
  private async initializeFunctions(): Promise<void> {
    // Load all the variables
    loadEnvVariables();
    // Connect to the database
    await this.dbConnection.connect();
    // Initializes common middleware that required for application
    InitializeMiddleware.initializeCommonMiddleware(this.app);
    // Set up application routes
    InitializeRoutes.initialize(this.app);

    // Start listening only if all initializations succeed
    this.listen();
  }

  public listen(): void {
    this.httpServer.listen(this.app.get('port'), () => {
      const nodeVersion = process.version;
      this.logger.info('==================================================');
      this.logger.info(`= Server up at🚀: http://localhost:${this.port} | ${nodeVersion} =`);
      this.logger.info('==================================================');
    });
  }
}

export default App;
