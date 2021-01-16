/**
 * @author - Wokoro Douye Samuel
 */


import { body } from 'express-validator';
import { getRates } from '../../service';
import { sendSuccessMessage } from '../../utils';

/**
 * @class
 *
 * @description - Class for rate controller.
*/
class RateController {
  /**
   * @description - Function to get rate
   *
   * @param {object} param0 - Request body property, with update values.
   *
   * @param {object} res - Express response object.
   *
   * @param {object} next - Function to pass control to next function.
   *
   * @return {void} - No return value
  */
  async getRate({ query }, res, next) {
    try {
      const { base: baseCurrency = '', currency = '' } = query;

      const { base, date, ...rates } = await getRates({ base: baseCurrency, symbols: currency });

      sendSuccessMessage(res, 200, { base, date, ...rates });
    } catch (error) {
      next(error);
    }
  }
}

export default new RateController();
