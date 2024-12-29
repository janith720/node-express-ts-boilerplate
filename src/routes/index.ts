import { Router } from 'express';
import { IRoute } from 'interfaces/routes.interfaces';
import IndexController from 'controllers';

class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
