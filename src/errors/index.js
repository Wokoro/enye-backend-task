/**
 * @author Wokoro Douye Samuel
 */

import { Http503Error } from './server.error.spec';
import { HttpClientError, Http400Error, Http406Error } from './client.error.spec';
import { sendErrorMessage, sendValidationErrorMessage } from '../utils';

import winston from '../config/winston';

/**
 * @description Route not found error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const notFoundError = (router) => {
  router.use((req, res) => {
    throw new Http400Error();
  });
};

/**
 * @description Client error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const clientError = (router) => {
  router.use((err, req, res, next) => {
    winston.logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    if (err instanceof Http406Error) {
      return sendValidationErrorMessage(res, err.status, err.message);
    }
    if (err instanceof HttpClientError) {
      return sendErrorMessage(res, err.status, err.message);
    }
    next(err);
  });
};

/**
 * @description Server error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns appropriate error messages.
 */
export const serverError = (router) => {
  router.use((err, req, res, next) => {
    winston.logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    if (err instanceof Http503Error) {
      return sendErrorMessage(res, err.status, err.message);
    }
    if (err.errno === 'ENOTFOUND') {
      console.log('error: ', err);
      return sendErrorMessage(res, 503, 'External service down, please try again later');
    }
    if (err instanceof Error) {
      console.log(err.message);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    console.log('error: ', err);
    return sendErrorMessage(res, 500, 'Server error occured');
  });
};
