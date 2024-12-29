import { config } from 'dotenv';

config({ path: `.env` });

export const {
  NODE_ENV = 'env',
  PORT = 3000,
  HOST = 'localhost',
  DB_URI = '',
  DB_DATABASE = '',
  CORS_ORIGIN = '',
  LOG_DIR = 'logs',
  LOG_DATE_PATTERN = 'YYYY-MM-DD-HH',
  LOG_FILE_NAME_PATTERN = '%DATE%.log',
  LOG_MAX_FILES = 14,
  SALT_WORK_FACTOR = 10,
  JWT_EXPIRY = '15m',
  REFRESH_EXPIRY = '1y',
} = process.env;

/**
 * Loads and validates environment variables.
 * @returns {void}
 * @throws {Error} - Throws error if required environment variables are missing or empty.
 */
function loadEnvVariables(): void {
  config();

  // Check required environment variables
  const requiredEnvVariables = ['NODE_ENV', 'PORT', 'HOST', 'DB_URI', 'DB_DATABASE'];

  for (const variable of requiredEnvVariables) {
    if (!process.env[variable] || process.env[variable]!.trim() === '') {
      throw new Error(`Required environment variable \`${variable}\` is missing or empty.`);
    }
  }
}

export default loadEnvVariables;
