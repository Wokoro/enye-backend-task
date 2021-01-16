/* eslint-disable max-len */
/**
 * @author - Wokoro Douye Samuel
 */

import express from 'express';

import routes from './components';
import { middlewareLoader, routesLoader, errorMiddlewareLoader } from './utils';
import docs from './docs';

const router = express.Router();

const app = express();
app.use('/api', router);

process.on('uncaughtException', (error) => {
  console.log('Uncaught: ', error);
});

process.on('unhandledRejection', (error) => {
  console.log('Unhandled: ', error);
});

middlewareLoader(['cors', 'bodyparser', 'compression', 'hpp', 'helmet'], router);
routesLoader(routes, router);
routesLoader(docs, router);
errorMiddlewareLoader(['notFound', 'clientError', 'serverError'], router);

export default app;
