import { Request, Response } from 'express';
import { handleError } from 'utils/errorHandler/errorHandler.utils';

class TestController {
  public testCon = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = 'Hello World';
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };
}

export default TestController;
