import { IRoute } from 'interfaces/routes.interfaces';
import TestRoute from './test/test.routes';
import IndexRoute from 'routes';
import { NODE_ENV } from 'configs/envValidator.configs';
import { Environment } from 'enums/core.enums';

const devRoutes: IRoute[] = [new TestRoute()];

const v1Routes: IRoute[] = [new IndexRoute()];

// Conditionally add devRoutes in development environment
if (NODE_ENV === Environment.DEV) {
  const devRoutes: IRoute[] = [new TestRoute()];
  v1Routes.push(...devRoutes);
}
export default v1Routes;
