import { Response } from 'express';
import { CustomError } from 'exceptions/CustomError';
import Logger from 'utils/logger';

export const truncateErrorStack = (stack: string | undefined, maxLength: number): string => {
  if (!stack) return '';
  return stack.length > maxLength ? `${stack.substring(0, maxLength)}...` : stack;
};

export const handleError = (err: Error, res: Response): void => {
  const logger = Logger.getLogger();
  logger.error(err);

  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, error } = err;
    res.status(statusCode).json({ ...error });
    return;
  }

  // Unhandled errors
  res.status(500).json({ errors: { message: 'Something went wrong' } });
};
