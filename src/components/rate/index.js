/**
 * @author - Wokoro Douye Samuel
 */

import controller from './controller';
import { getRateValidations } from './validation';

export default [
  {
    path: '/rates',
    method: 'get',
    handlers: [...getRateValidations, controller.getRate]
  }
];
