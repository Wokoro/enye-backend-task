/**
 * @author - Wokoro Douye Samuel
 */

import axios from 'axios';
import { Http400Error } from '../errors/client.error.spec';

const EXCHANGE_RATES_API = 'https://api.exchangeratesapi.io/latest';

/**
* @description - Function to get exchange rates.
*
* @param {object} params - Query parameters to send
*
* @returns{object} - Returns rates or error
*/
export const getRates = async (params = {}) => {
  try {
    const response = (await axios.get(EXCHANGE_RATES_API, { params }));
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Http400Error(error.response.data.error);
    } else if (error.request) {
      throw new Http400Error('Unable to initiate request, please try again later');
    } else {
      throw new Http400Error(error.message);
    }
  }
};
