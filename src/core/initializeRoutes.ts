import { Application } from 'express';
import IndexRoute from 'routes';
import v1Routes from 'routes/v1';

const routes = [new IndexRoute(), ...v1Routes];

class InitializeRoutes {
  public static async initialize(app: Application): Promise<void> {
    routes.forEach(route => {
      app.use('/', route.router);
    });
  }
}

export default InitializeRoutes;
