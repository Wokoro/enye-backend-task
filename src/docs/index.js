/**
 * @author - Wokoro Douye Samuel
 */

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import config from '../config/swagger';

export default [
  {
    path: '/docs',
    method: 'use',
    handlers: [swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(config))]
  }
];
