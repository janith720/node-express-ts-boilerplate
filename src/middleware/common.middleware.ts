import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from 'configs/envValidator.configs';
import winston from 'winston';
import Logger from 'utils/logger';

class CommonMiddleware {
  // The Express application instance.
  public app: Application;
  // The logger instance for logging purposes.
  public logger: winston.Logger;

  /**
   * Creates an instance of CommonMiddleware.
   * @param {Application} _app The Express application instance to attach middleware to.
   */
  constructor(_app: Application) {
    this.app = _app;
    this.logger = Logger.getLogger();
  }

  /**
   * Initializes the common middleware for the Express application.
   */
  public initializeMiddleware(): void {
    this.useBodyParser();
    this.useURLEncoded();
    this.useCors();
    this.useHelmet();
    // Add other middleware initialization here
  }

  /**
   * Adds JSON body parsing middleware.
   */
  public useBodyParser(): void {
    this.app.use(express.json());
  }

  /**
   * Adds URL-encoded body parsing middleware.
   */
  public useURLEncoded(): void {
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Adds Helmet middleware for securing HTTP headers.
   */
  public useHelmet(): void {
    this.app.use(helmet());
  }

  /**
   * Adds CORS middleware to enable Cross-Origin Resource Sharing.
   * @remarks please change hardcoded origin url
   */
  public useCors(): void {
    const corsOptions = {
      exposedHeaders: ['Authorization', 'Refresh-Token'],
      origin: `http://localhost:${PORT}`,
      credentials: true,
    };

    this.app.use(cors(corsOptions));
  }
}

export default CommonMiddleware;
