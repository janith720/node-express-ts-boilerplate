import { Router } from 'express';
import { IRoute } from 'interfaces/routes.interfaces';
import TestController from 'controllers/v1/test/test.controller';

class TestRoute implements IRoute {
  public path = '/test';
  public router = Router();
  public testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.testController.testCon);
  }
}

export default TestRoute;
